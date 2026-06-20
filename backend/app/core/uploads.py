import os
from pathlib import Path
from urllib.parse import urlparse


def normalize_upload_path(value: str | None) -> str:
    raw = (value or "").strip()
    if not raw or raw == "No Poster URL" or raw == "-":
        return ""

    path_like = raw
    if raw.startswith("http://") or raw.startswith("https://"):
        parsed = urlparse(raw)
        path_like = parsed.path or ""

    if path_like.startswith("/uploads/"):
        return path_like
    if path_like.startswith("uploads/"):
        return f"/{path_like}"
    if path_like.startswith("/profiles/"):
        return f"/uploads{path_like}"
    if path_like.startswith("profiles/"):
        return f"/uploads/{path_like}"
    return f"/uploads/profiles/{path_like.lstrip('/')}"


def extract_upload_identity(value: str | None) -> str:
    normalized = normalize_upload_path(value)
    if not normalized:
        return ""
    return Path(normalized).name


def extract_stored_upload_path(value: str | None, category: str) -> str:
    identity = extract_upload_identity(value)
    if not identity:
        return ""
    return f"/profiles/{category}/{identity}"


def resolve_uploaded_file_path(value: str | None, category: str) -> Path | None:
    identity = extract_upload_identity(value)
    if not identity:
        return None

    upload_root = Path(os.getenv("UPLOAD_DIR", "uploads")).resolve()
    target = (upload_root / "profiles" / category / identity).resolve()

    try:
        target.relative_to(upload_root)
    except ValueError:
        return None
    return target


def delete_uploaded_file(value: str | None, category: str) -> None:
    target = resolve_uploaded_file_path(value, category)
    if not target:
        return

    try:
        if target.exists() and target.is_file():
            target.unlink()
    except Exception:
        pass
