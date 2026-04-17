from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import strawberry
from strawberry.fastapi import GraphQLRouter
from app.graphql.resolvers import queries, mutations, bootstrap_admins_from_nss_core
from app.core.database import get_database, close_connection
from os import getenv
import os
import time
import psutil
from pathlib import Path
from uuid import uuid4
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response
from urllib.parse import quote_plus
from fastapi.responses import RedirectResponse
from cas import CASClient
from fastapi.staticfiles import StaticFiles

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
cas_client_nss = CASClient(
    version=3,
    server_url=CAS_SERVER_URL,
    service_url=None
)

REDIRECT_URL = getenv("REDIRECT_URL", "/")
JWT_SECRET = getenv("JWT_SECRET", "jwt-secret-very-very-secret")
service_url_formatted = "%s?next=%s"


@app.get("/login")
@app.get("/login/")
async def login_redirect(request: Request, path: str = None):
    next_url = path or REDIRECT_URL
    cas_client_nss.service_url = service_url_formatted % (SERVICE_URL, quote_plus(next_url))
    ticket = request.query_params.get("ticket")
    if not ticket:
        cas_login_url = cas_client_nss.get_login_url()
        return RedirectResponse(url=cas_login_url)

    user, attributes, pgtiou = cas_client_nss.verify_ticket(ticket)
    frontend_url = "http://localhost:3000/"

    response = RedirectResponse(url=frontend_url)
    # Set cookie with uid
    response.set_cookie(
        key="uid",
        value=attributes["uid"],
        httponly=False,  # Prevent JS access if you want
        secure=False,   # Set to True if using HTTPS
        samesite="lax"
    )

    # Keep email in cookie when CAS provides it so admin role checks can resolve identity.
    email_value = attributes.get("mail") or attributes.get("email")
    if email_value:
        if isinstance(email_value, list):
            email_value = email_value[0] if email_value else ""
        response.set_cookie(
            key="email",
            value=str(email_value).strip().lower(),
            httponly=False,
            secure=False,
            samesite="lax"
        )
    return response

# Prometheus metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration')

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GraphQL router
schema = strawberry.Schema(query=Query, mutation=Mutation)


async def get_context(request: Request):
    return {"request": request}


gqlr = GraphQLRouter(schema, graphql_ide='graphiql', context_getter=get_context)
app.include_router(gqlr, prefix="/graphql")

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "uploads")).resolve()
UPLOAD_PROFILES_DIR = UPLOAD_DIR / "profiles"
UPLOAD_MEMBERS_DIR = UPLOAD_PROFILES_DIR / "members"
UPLOAD_EVENTS_DIR = UPLOAD_PROFILES_DIR / "events"
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "10485760"))

UPLOAD_PROFILES_DIR.mkdir(parents=True, exist_ok=True)
UPLOAD_MEMBERS_DIR.mkdir(parents=True, exist_ok=True)
UPLOAD_EVENTS_DIR.mkdir(parents=True, exist_ok=True)


@app.post("/uploads/profiles/{category}")
async def upload_profile_image(category: str, file: UploadFile = File(...)):
    category_name = (category or "").strip().lower()
    if category_name not in {"members", "events"}:
        raise HTTPException(status_code=400, detail="Invalid upload category")

    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing file name")

    content_type = (file.content_type or "").lower()
    if not content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    suffix = Path(file.filename).suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
        raise HTTPException(status_code=400, detail="Unsupported image extension")

    generated_name = f"{uuid4().hex}{suffix}"
    target_dir = UPLOAD_MEMBERS_DIR if category_name == "members" else UPLOAD_EVENTS_DIR
    destination = target_dir / generated_name

    total_size = 0
    with destination.open("wb") as buffer:
        while True:
            chunk = await file.read(1024 * 1024)
            if not chunk:
                break
            total_size += len(chunk)
            if total_size > MAX_FILE_SIZE:
                buffer.close()
                destination.unlink(missing_ok=True)
                raise HTTPException(status_code=413, detail="File too large")
            buffer.write(chunk)

    await file.close()
    public_path = f"/uploads/profiles/{category_name}/{generated_name}"
    return {"path": public_path}


# Serve uploaded files statically
app.mount(
    "/uploads",
    StaticFiles(directory=str(UPLOAD_DIR)),
    name="uploads"
)


@app.on_event("startup")
async def startup_event():
    # Initialize DB at startup
    get_database()
    bootstrap_admins_from_nss_core()


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
