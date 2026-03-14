import uuid
import os
from urllib.parse import urlparse

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
FILES_BASE_URL = os.getenv("FILES_BASE_URL", "http://localhost:8000/uploads")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# check if filename already exists, if it does change the existing one else save new


def save_file(file_content: bytes, original_filename: str) -> str:
    ext = os.path.splitext(original_filename)[1]
    unique_filename = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as f:
        f.write(file_content)
    return f"{FILES_BASE_URL}/{unique_filename}"


def _to_local_path(file_url_or_path: str) -> str:
    """Converts a URL or path to a local filesystem path relative to the app root."""
    if file_url_or_path.startswith("http://") or file_url_or_path.startswith("https://"):
        parsed = urlparse(file_url_or_path)
        path = parsed.path
    else:
        path = file_url_or_path
    return path.lstrip("/")


def update_file(old_file_path: str, new_file_content: bytes, original_filename: str) -> str:
    # Delete old file (accepts URL or path)
    full_old_path = _to_local_path(old_file_path)
    if os.path.exists(full_old_path):
        os.remove(full_old_path)
    # Save new file
    return save_file(new_file_content, original_filename)


def delete_file(file_path: str) -> bool:
    full_path = _to_local_path(file_path)
    if os.path.exists(full_path):
        os.remove(full_path)
        return True
    return False


def get_file(file_path: str) -> bytes | None:
    full_path = _to_local_path(file_path)
    if os.path.exists(full_path):
        with open(full_path, "rb") as f:
            return f.read()
    return None
