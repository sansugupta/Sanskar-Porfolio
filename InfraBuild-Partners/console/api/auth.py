"""
Authentication module for InfraBuild Management Console.
Simple password-based auth with JWT tokens.
"""
import os
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer(auto_error=False)

# Secrets must be provided by the deployment environment.
SECRET_KEY = os.getenv("CONSOLE_SECRET_KEY", "")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 12

# Admin password hash must be set via env var.
ADMIN_PASSWORD_HASH = os.getenv("CONSOLE_ADMIN_PASSWORD_HASH", "")
if not SECRET_KEY or not ADMIN_PASSWORD_HASH:
    raise RuntimeError(
        "CONSOLE_SECRET_KEY and CONSOLE_ADMIN_PASSWORD_HASH must be set in the deployment environment."
    )


def verify_password(plain_password: str) -> bool:
    return pwd_context.verify(plain_password, ADMIN_PASSWORD_HASH)


def create_access_token() -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode = {"sub": "admin", "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> bool:
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return True
    except JWTError:
        return False


async def require_auth(request: Request, credentials: HTTPAuthorizationCredentials = None):
    """Dependency: require valid JWT token or session cookie."""
    token = None

    # Check Authorization header
    if credentials:
        token = credentials.credentials
    # Check cookie fallback
    if not token:
        token = request.cookies.get("console_token")

    if not token or not verify_token(token):
        raise HTTPException(status_code=401, detail="Not authenticated")

    return token
