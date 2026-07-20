#!/bin/bash

set -euo pipefail

# ---------------------------------------------------------------------------
# Wait for MongoDB to be ready before starting the application.
# This is a belt-and-suspenders check on top of Docker Compose's
# service_healthy condition — useful when running outside Compose.
# ---------------------------------------------------------------------------
echo "Waiting for MongoDB to be ready..."
MAX_RETRIES=30
RETRY_INTERVAL=2
retries=0

until python -c "
import os, sys
from pymongo import MongoClient
try:
    MongoClient(os.environ['MONGODB_URL'], serverSelectionTimeoutMS=2000).admin.command('ping')
    sys.exit(0)
except Exception as e:
    print(f'MongoDB not ready: {e}', flush=True)
    sys.exit(1)
" 2>/dev/null; do
    retries=$((retries + 1))
    if [ "$retries" -ge "$MAX_RETRIES" ]; then
        echo "ERROR: MongoDB did not become ready after $((MAX_RETRIES * RETRY_INTERVAL))s. Aborting."
        exit 1
    fi
    echo "MongoDB not ready yet (attempt $retries/$MAX_RETRIES), retrying in ${RETRY_INTERVAL}s..."
    sleep "$RETRY_INTERVAL"
done

echo "MongoDB is ready."

# ---------------------------------------------------------------------------
# Start the application
# ---------------------------------------------------------------------------
echo "Starting FastAPI application..."
echo "GraphQL API available at http://localhost:8000/graphql"

if [ "${API_ENV:-development}" = "production" ]; then
    # Production: Gunicorn process manager with Uvicorn workers.
    # Gunicorn handles worker lifecycle, signals and graceful restarts.
    # UvicornWorker provides async I/O inside each worker process.
    exec venv/bin/gunicorn main:app \
        --bind "0.0.0.0:${API_PORT:-8000}" \
        --workers "${WORKERS:-4}" \
        --worker-class uvicorn.workers.UvicornWorker \
        --timeout 120 \
        --graceful-timeout 30 \
        --keep-alive 5 \
        --access-logfile - \
        --error-logfile -
else
    # Development: Uvicorn with hot-reload
    exec venv/bin/uvicorn main:app \
        --host 0.0.0.0 \
        --port "${API_PORT:-8000}" \
        --reload
fi
