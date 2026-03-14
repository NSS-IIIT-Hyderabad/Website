from fastapi.testclient import TestClient

from main import app


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
