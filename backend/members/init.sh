#!/bin/sh
echo "open http://localhost:8000/graphql to test the GraphQL API"
venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --reload