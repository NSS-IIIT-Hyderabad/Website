from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import strawberry
from strawberry.fastapi import GraphQLRouter
from qnm_members import queries, mutations
from database import get_database, close_connection
from os import getenv
import os
import time
import psutil
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response
from urllib.parse import quote_plus
from fastapi.responses import RedirectResponse
from cas import CASClient
from fastapi.staticfiles import StaticFiles
from auth import JWT_COOKIE_NAME, create_access_token, require_user
from model_users import UserRole

from strawberry.tools import create_type
Query = create_type("Query", queries)
Mutation = create_type("Mutation", mutations)

app = FastAPI(
    title="NSS IIITH API",
    description="GraphQL API for NSS IIITH Website",
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
    root_path="/api"
)


SECURE_COOKIES = getenv("SECURE_COOKIES", "False").lower() in ("true", "1", "t")
CAS_SERVER_URL = getenv("CAS_SERVER_URL", "https://login.iiit.ac.in/cas/")
SERVICE_URL = getenv("SERVICE_URL", "http://localhost:8000/login")

REDIRECT_URL = getenv("REDIRECT_URL", "/")
service_url_formatted = "%s?next=%s"


def _build_cas_client(next_url: str) -> CASClient:
    # A fresh client per request avoids mutating shared state (service_url)
    # on a module-level singleton across concurrent requests.
    return CASClient(
        version=3,
        server_url=CAS_SERVER_URL,
        service_url=service_url_formatted % (SERVICE_URL, quote_plus(next_url)),
    )


@app.get("/login")
@app.get("/login/")
async def login_redirect(request: Request, path: str = None, next: str = None):
    next_url = path or next or REDIRECT_URL
    cas_client = _build_cas_client(next_url)
    ticket = request.query_params.get("ticket")
    if not ticket:
        cas_login_url = cas_client.get_login_url()
        return RedirectResponse(url=cas_login_url)

    try:
        user, attributes, pgtiou = cas_client.verify_ticket(ticket)
    except Exception as exc:
        raise HTTPException(status_code=401, detail="CAS authentication failed") from exc

    if not user:
        raise HTTPException(status_code=401, detail="CAS authentication failed")

    attributes = attributes or {}
    uid = attributes.get("uid") or user
    email = attributes.get("mail") or attributes.get("email") or f"{uid}@iiith.ac.in"
    if isinstance(email, list):
        email = email[0]
    database = get_database()
    database["users"].update_one(
        {"uid": uid},
        {"$set": {"email": email}, "$setOnInsert": {"uid": uid, "role": UserRole.USER.value}},
        upsert=True,
    )
    authenticated_user = database["users"].find_one({"uid": uid}, {"_id": 0})
    frontend_url = getenv("FRONTEND_URL", "http://localhost:3000")
    redirect_target = next_url if next_url.startswith("/") else REDIRECT_URL

    response = RedirectResponse(url=f"{frontend_url}{redirect_target}")
    response.set_cookie(
        key=JWT_COOKIE_NAME,
        value=create_access_token(authenticated_user),
        httponly=True,
        secure=SECURE_COOKIES,
        samesite="lax",
        max_age=60 * 60 * 8,
    )
    return response


@app.get("/auth/me")
async def current_user(request: Request):
    return require_user(request)


@app.get("/auth/logout")
async def logout():
    response = RedirectResponse(url=getenv("CAS_SERVER_URL", "http://localhost:3000")+"/logout")
    response.delete_cookie(JWT_COOKIE_NAME)
    return response

# Prometheus metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration')

# CORS middleware
# allow_credentials=True cannot be combined with a wildcard origin, so the
# allowed origins must be an explicit list, driven by ALLOWED_ORIGINS.
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GraphQL router
schema = strawberry.Schema(query=Query, mutation=Mutation)


async def graphql_context(request: Request):
    return {"request": request}


gqlr = GraphQLRouter(schema, graphql_ide='graphiql', context_getter=graphql_context)
app.include_router(gqlr, prefix="/graphql")

# Serve uploaded files statically
app.mount(
    "/uploads",
    StaticFiles(directory=os.getenv("UPLOAD_DIR", "uploads")),
    name="uploads"
)


@app.on_event("startup")
async def startup_event():
    # Initialize DB at startup
    get_database()


@app.on_event("shutdown")
async def shutdown_event():
    # Clean up DB connection
    close_connection()

# Health check endpoints


@app.get("/health")
async def health_check():
    """Basic health check endpoint"""
    return {"status": "healthy", "timestamp": time.time()}


@app.get("/health/detailed")
async def detailed_health_check():
    """Detailed health check with system metrics"""
    try:
        # Check system metrics
        cpu_percent = psutil.cpu_percent()
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')

        # Check database connection (if needed)
        # Add your database health check here

        return {
            "status": "healthy",
            "timestamp": time.time(),
            "system": {
                "cpu_percent": cpu_percent,
                "memory_percent": memory.percent,
                "disk_percent": disk.percent,
                "uptime": time.time() - psutil.boot_time()
            },
            "environment": {
                "api_env": os.getenv("API_ENV", "development"),
                "mongodb_url": "configured" if os.getenv("MONGODB_URL") else "missing"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Health check failed: {str(e)}")


@app.get("/metrics")
async def metrics():
    """Prometheus metrics endpoint"""
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

# Root endpoint


@app.get("/")
async def root():
    return {
        "message": "NSS IIITH API",
        "graphql_endpoint": "/graphql",
        "health_check": "/health",
        "docs": "/docs"
    }
