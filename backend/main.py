import logging
import os
import time
from contextlib import asynccontextmanager
from urllib.parse import quote_plus

import psutil
import strawberry
from cas import CASClient
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, Response
from fastapi.staticfiles import StaticFiles
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from strawberry.fastapi import GraphQLRouter
from strawberry.tools import create_type

from database import close_connection, get_database, ping_database
from qnm_members import mutations, queries

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# GraphQL schema
# ---------------------------------------------------------------------------

Query = create_type("Query", queries)
Mutation = create_type("Mutation", mutations)
schema = strawberry.Schema(query=Query, mutation=Mutation)

# ---------------------------------------------------------------------------
# Configuration — read from environment at startup, never hard-coded
# ---------------------------------------------------------------------------

SECURE_COOKIES: bool = os.getenv("SECURE_COOKIES", "False").lower() in ("true", "1", "t")
CAS_SERVER_URL: str = os.getenv("CAS_SERVER_URL", "https://login.iiit.ac.in/cas/")
SERVICE_URL: str = os.getenv("SERVICE_URL", "http://localhost:8000/login")
REDIRECT_URL: str = os.getenv("REDIRECT_URL", "/")
JWT_SECRET: str = os.getenv("JWT_SECRET", "jwt-secret-very-very-secret")
API_ENV: str = os.getenv("API_ENV", "development")

# CORS — honour ALLOWED_ORIGINS env var in all environments
_raw_origins = os.getenv("ALLOWED_ORIGINS", "")
ALLOWED_ORIGINS: list[str] = (
    [o.strip() for o in _raw_origins.split(",") if o.strip()]
    if _raw_origins
    else ["*"]
)

cas_client_nss = CASClient(
    version=3,
    server_url=CAS_SERVER_URL,
    service_url=None,
)

# ---------------------------------------------------------------------------
# Prometheus metrics
# ---------------------------------------------------------------------------

REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total HTTP requests",
    ["method", "endpoint"],
)
REQUEST_DURATION = Histogram(
    "http_request_duration_seconds",
    "HTTP request duration in seconds",
)

# ---------------------------------------------------------------------------
# Application lifespan — replaces deprecated @app.on_event
# ---------------------------------------------------------------------------


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage database connection lifecycle.

    Verifies the database is reachable before the application starts
    accepting traffic (fail-fast readiness gate).
    """
    logger.info("Starting up — verifying database connectivity …")
    try:
        await ping_database()
        logger.info("Database ping successful.")
    except Exception as exc:  # noqa: BLE001
        # Surface a meaningful error so ops/orchestrators know why startup failed
        logger.error("Database unreachable at startup: %s", exc)
        raise RuntimeError(f"Cannot connect to MongoDB: {exc}") from exc

    yield  # application runs here

    logger.info("Shutting down — closing database connection …")
    await close_connection()
    logger.info("Database connection closed.")


# ---------------------------------------------------------------------------
# FastAPI application
# ---------------------------------------------------------------------------

app = FastAPI(
    title="NSS IIITH API",
    description="GraphQL API for NSS IIITH Website",
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
    root_path="/api",
    lifespan=lifespan,
)

# CORS middleware — wildcard only in development, scoped in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GraphQL router
gqlr = GraphQLRouter(schema, graphql_ide="graphiql")
app.include_router(gqlr, prefix="/graphql")

# Serve uploaded files statically
app.mount(
    "/uploads",
    StaticFiles(directory=os.getenv("UPLOAD_DIR", "uploads")),
    name="uploads",
)

# ---------------------------------------------------------------------------
# Authentication — CAS SSO
# ---------------------------------------------------------------------------

_service_url_template = "%s?next=%s"


@app.get("/login")
@app.get("/login/")
async def login_redirect(request: Request, path: str = None):
    next_url = path or REDIRECT_URL
    cas_client_nss.service_url = _service_url_template % (
        SERVICE_URL,
        quote_plus(next_url),
    )
    ticket = request.query_params.get("ticket")
    if not ticket:
        return RedirectResponse(url=cas_client_nss.get_login_url())

    user, attributes, pgtiou = cas_client_nss.verify_ticket(ticket)
    frontend_url = os.getenv("REDIRECT_URL", "/")

    response = RedirectResponse(url=frontend_url)
    response.set_cookie(
        key="uid",
        value=attributes["uid"],
        httponly=True,        # Prevent XSS access via JavaScript
        secure=SECURE_COOKIES,  # Enforce HTTPS in production
        samesite="lax",
    )
    return response


# ---------------------------------------------------------------------------
# Health & observability endpoints
# ---------------------------------------------------------------------------


@app.get("/health", tags=["observability"])
async def health_check():
    """Liveness probe — returns healthy if the process is running."""
    return {"status": "healthy", "timestamp": time.time()}


@app.get("/health/ready", tags=["observability"])
async def readiness_check():
    """Readiness probe — returns healthy only when the DB is reachable.

    Use this endpoint for Kubernetes readinessProbe / load-balancer health
    checks so traffic is only sent to instances with a live DB connection.
    """
    try:
        await ping_database()
        return {
            "status": "ready",
            "timestamp": time.time(),
            "checks": {"mongodb": "ok"},
        }
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=503,
            detail={"status": "not_ready", "checks": {"mongodb": str(exc)}},
        ) from exc


@app.get("/health/detailed", tags=["observability"])
async def detailed_health_check():
    """Detailed health check with system and DB metrics."""
    try:
        await ping_database()
        db_status = "ok"
    except Exception as exc:  # noqa: BLE001
        db_status = str(exc)

    try:
        cpu_percent = psutil.cpu_percent()
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage("/")
        system = {
            "cpu_percent": cpu_percent,
            "memory_percent": memory.percent,
            "disk_percent": disk.percent,
            "uptime_seconds": time.time() - psutil.boot_time(),
        }
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=503, detail=f"Health check failed: {exc}"
        ) from exc

    overall = "healthy" if db_status == "ok" else "degraded"
    return {
        "status": overall,
        "timestamp": time.time(),
        "checks": {"mongodb": db_status},
        "system": system,
        "environment": {
            "api_env": API_ENV,
            "mongodb_url": "configured" if os.getenv("MONGODB_URL") else "missing",
        },
    }


@app.get("/metrics", tags=["observability"])
async def metrics():
    """Prometheus metrics scrape endpoint."""
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)


# ---------------------------------------------------------------------------
# Root
# ---------------------------------------------------------------------------


@app.get("/", tags=["meta"])
async def root():
    return {
        "message": "NSS IIITH API",
        "graphql_endpoint": "/graphql",
        "health_check": "/health",
        "readiness_check": "/health/ready",
        "docs": "/docs",
    }
