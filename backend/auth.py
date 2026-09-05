from datetime import datetime, timedelta, timezone
from os import getenv

import jwt
from fastapi import HTTPException, Request

from database import get_database

JWT_ALGORITHM = "HS256"
JWT_COOKIE_NAME = "access_token"
JWT_SECRET = getenv("JWT_SECRET", "change-this-development-secret")
JWT_EXPIRE_MINUTES = int(getenv("JWT_EXPIRE_MINUTES", "480"))


def create_access_token(user: dict) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": user["uid"],
        "email": user.get("email", ""),
        "role": user.get("role", "user"),
        "iat": now,
        "exp": now + timedelta(minutes=JWT_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def get_current_user(request: Request) -> dict | None:
    token = request.cookies.get(JWT_COOKIE_NAME)
    if not token:
        return None
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        return None
    return get_database()["users"].find_one({"uid": payload.get("sub")}, {"_id": 0})


def require_user(request: Request) -> dict:
    user = get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    return user


def require_admin(request: Request) -> dict:
    user = require_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")
    return user