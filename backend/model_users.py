from enum import Enum

import strawberry


@strawberry.enum
class UserRole(str, Enum):
    USER = "user"
    NSS_MEMBER = "nss_member"
    VOLUNTEER = "volunteer"
    ADMIN = "admin"


@strawberry.type
class User:
    uid: str
    email: str
    role: UserRole
    member_id: str | None = None