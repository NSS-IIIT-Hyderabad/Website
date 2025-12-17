from fastapi.testclient import TestClient
import pytest

import sys
import os

# Ensure backend package files are importable when running tests from repo root
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.main import app


client = TestClient(app)


def test_health_endpoint():
    """Basic test to ensure the health endpoint returns healthy status and a timestamp."""
    resp = client.get("/api/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("status") == "healthy"
    assert "timestamp" in data


def test_root_endpoint():
    """Root endpoint should return basic info about the API."""
    resp = client.get("/api/")
    assert resp.status_code == 200
    data = resp.json()
    assert "message" in data
    assert "graphql_endpoint" in data
