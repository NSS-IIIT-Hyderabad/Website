from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import strawberry
from strawberry.fastapi import GraphQLRouter
from qnm import queries, mutations
import os
import time
import psutil
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response

from strawberry.tools import create_type
Query = create_type("Query", queries)
Mutation = create_type("Mutation", mutations)

# Prometheus metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration')

# Create FastAPI app
app = FastAPI(
    title="NSS IIITH API",
    description="GraphQL API for NSS IIITH Website",
    version="1.0.0",
    docs_url="/docs",            # This stays
    openapi_url="/openapi.json", # This stays
    root_path="/api"                 # <--- THIS IS CRUCIAL!
)

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
gqlr = GraphQLRouter(schema, graphiql=True)
app.include_router(gqlr, prefix="/graphql")

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
