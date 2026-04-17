# Dev Seed JSONs (MongoDB Compass)

Use this folder to quickly seed local MongoDB for development.

## 1) Create upload directories

If you are currently inside `backend/`, move to Website root first:

```bash
cd ..
```

From `Website/`, run:

```bash
mkdir -p backend/uploads/profiles/members backend/uploads/profiles/events
```

## 2) Import into MongoDB Compass

1. Open MongoDB Compass and connect to your local/dev MongoDB.
2. Open database: `nss_db`.
3. For each collection below, use **Add Data -> Import JSON or CSV file** and select the matching file from this folder:
   - collection `members` -> `members.json`
   - collection `events` -> `events.json`
   - collection `testimonials` -> `testimonials.json`
   - collection `admins` -> `admins.json`
4. Use default import mode unless you specifically need custom mapping.

## 3) Start services

From `Website/`:

```bash
docker compose up --build
```

After startup, admin pages should work with the imported seed data.
