#!/bin/bash
set -e

# Wait for MongoDB
echo "Checking MongoDB connection..."
until curl -s http://nss-mongodb-dev:27017/ > /dev/null; do
  echo "MongoDB not ready yet, waiting..."
  sleep 1
done
echo "MongoDB is ready!"

# Check if strawberry is installed
if [ ! -f "venv/bin/strawberry" ]; then
  echo "Installing missing strawberry package..."
  venv/bin/pip install strawberry-graphql
fi

# Generate GraphQL schema
venv/bin/strawberry export-schema main > schema.graphql

# Run with hot reload
exec venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --root-path /api --reload