FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONIOENCODING=utf-8 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies
# gcc is kept as a fallback in case a pinned dependency version has no
# prebuilt wheel for this platform and needs to compile from source.
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Create virtual environment
RUN python -m venv venv
RUN venv/bin/pip install --upgrade pip

# Copy requirements first for better caching
COPY requirements.txt .
RUN venv/bin/pip install -r requirements.txt

# Copy application code
COPY . .

RUN mkdir -p uploads

# Generate GraphQL schema
RUN venv/bin/strawberry export-schema main > schema.graphql

# Make init script executable
RUN chmod +x init.sh

RUN useradd --create-home --shell /bin/bash app && chown -R app:app /app
USER app
# Ensure uploads directory exists and is owned by app user
RUN mkdir -p uploads && chown app:app uploads

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD ["venv/bin/python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]

EXPOSE 8000
ENTRYPOINT ["./init.sh"]
