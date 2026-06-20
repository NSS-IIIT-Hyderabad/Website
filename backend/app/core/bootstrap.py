from app.core.auth import admin_doc_from_member, db, now_iso


def bootstrap_admins_from_nss_core() -> int:
    db["admins"].create_index("memberId", unique=True, sparse=True)
    db["admins"].create_index("email", unique=True, sparse=True)
    db["admins"].create_index("rollNumber", unique=True, sparse=True)

    seeded = 0
    members = list(db["members"].find({}))
    for member in members:
        work_history = member.get("workHistory", []) or []
        is_core = any(
            isinstance(row, dict)
            and "nss core" in str(row.get("team", "")).strip().lower()
            for row in work_history
        )
        if not is_core:
            continue

        admin_doc = admin_doc_from_member(member, source="bootstrap:nss-core", granted_by="system")
        if not admin_doc["memberId"]:
            continue

        identity_filter = [{"memberId": admin_doc["memberId"]}]
        if admin_doc["email"]:
            identity_filter.append({"email": admin_doc["email"]})
        if admin_doc["rollNumber"]:
            identity_filter.append({"rollNumber": admin_doc["rollNumber"]})

        db["admins"].update_one(
            {"$or": identity_filter},
            {
                "$set": {
                    "rollNumber": admin_doc["rollNumber"],
                    "email": admin_doc["email"],
                    "emailUsername": admin_doc["emailUsername"],
                    "name": admin_doc["name"],
                    "active": True,
                    "updatedAt": now_iso(),
                },
                "$setOnInsert": {
                    "source": admin_doc["source"],
                    "grantedBy": admin_doc["grantedBy"],
                    "grantedAt": admin_doc["grantedAt"],
                },
            },
            upsert=True,
        )
        seeded += 1

    return seeded
