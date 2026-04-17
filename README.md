# NSS IIITH Website

The official website for the National Service Scheme (NSS) chapter at IIIT Hyderabad. This is a full-stack web application built with a microservices architecture — a **Next.js** frontend, a **FastAPI** (GraphQL) backend, **MongoDB** for persistence, and **Nginx** as a reverse proxy. Everything is orchestrated with Docker Compose.

## Table of Contents
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Commands](#commands)
- [Services Overview](#services-overview)
- [SSL Certificates](#ssl-certificates)
- [Monitoring](#monitoring)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)

## Requirements
- [Docker](https://docs.docker.com/get-docker/) (v24+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+, included with Docker Desktop)
- [Git](https://git-scm.com/)
- `make` (optional, for Makefile shortcuts)

## Project Structure

```
Website/
├── backend/                  # FastAPI + Strawberry GraphQL API
│   ├── tests/                # pytest test suite
│   ├── Dockerfile            # Production Docker image
│   ├── Dockerfile.dev        # Development Docker image (hot-reload)
│   ├── main.py               # Application entry point
│   ├── database.py           # MongoDB connection
│   ├── schema.graphql        # GraphQL schema
│   └── requirements.txt      # Python dependencies
├── frontend/                 # Next.js application
│   ├── src/                  # Source code
│   ├── public/               # Static assets
│   ├── Dockerfile            # Production Docker image
│   └── Dockerfile.dev        # Development Docker image (hot-reload)
├── nginx/                    # Nginx reverse proxy configuration
├── monitoring/               # Prometheus configuration
├── scripts/                  # Helper scripts (SSL, backup, management)
├── .github/                  # Issue templates, PR template, CI workflow
├── docker-compose.yml        # Development stack
├── docker-compose.prod.yml   # Production stack
├── Makefile                  # Convenient shortcut commands
├── mongo-init.js             # MongoDB initialisation script
└── .env.production.template  # Template for production environment variables
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NSS-IIIT-Hyderabad/Website.git
cd Website
```

### 2. Configure Environment Variables

Copy the template and fill in the values appropriate for your environment:

```bash
# For development
cp .env.production.template .env.development
# Edit .env.development with development values

# For production
cp .env.production.template .env.production
# Edit .env.production with your real production secrets
```

> **Never commit `.env.production` or `.env.development` to version control.**  
> Both files are already in `.gitignore`.

### 3. Build and Start Services

**Development (with hot-reload):**
```bash
docker compose up --build
# or using make
make ub
```

**Production:**
```bash
docker compose -f docker-compose.prod.yml up -d --build
# or using make
make prod-ub
```

### 4. Access the Application

| Mode        | URL                                   | Description            |
|-------------|---------------------------------------|------------------------|
| Development | `http://localhost`                    | Frontend               |
| Development | `http://localhost/api/graphql`        | GraphQL playground     |
| Development | `http://localhost/api/health`         | Backend health check   |
| Development | `http://localhost/api/docs`           | Swagger / OpenAPI docs |
| Production  | `http://localhost:8080`               | Frontend               |
| Production  | `http://localhost:8080/api/graphql`   | GraphQL endpoint       |
| Production  | `http://localhost:8080/api/health`    | Backend health check   |

## Environment Variables

The repository ships a fully annotated template at `.env.production.template`.  
Key variables:

| Variable | Description |
|---|---|
| `MONGODB_URL` | MongoDB connection string |
| `API_ENV` | `development` or `production` |
| `NEXT_PUBLIC_API_URL` | Public URL the browser uses to reach the API |
| `UPLOADS_HOST_DIR` | Host machine directory where uploaded files are persisted |
| `UPLOAD_DIR` | Backend container path for uploads (mounted from `UPLOADS_HOST_DIR`) |
| `CAS_SERVER_URL` | IIIT CAS login server URL |
| `SERVICE_URL` | Callback URL for CAS authentication |
| `SECRET_KEY` | Secret key for signing tokens |
| `LOG_LEVEL` | Logging verbosity (`debug`, `info`, `warning`, `error`) |

## Commands

The `Makefile` wraps the most common `docker compose` invocations:

### Development

| Command | Description |
|---|---|
| `make up` | Start all services |
| `make ub` | Build images and start all services |
| `make down` | Stop all services |
| `make down-v` | Stop all services and remove volumes |
| `make vub` | Remove volumes, rebuild, and start |
| `make logs` | Tail logs for all services |
| `make ps` | List running containers |
| `make restart` | Restart all services |
| `make build` | Build images without starting |
| `make shell` | Open a shell in the first running container |
| `make clean` | Remove containers, volumes, images and orphans |
| `make prune` | Remove all unused Docker resources (caution!) |

### Production

| Command | Description |
|---|---|
| `make prod-ub` | Build and start in detached mode |
| `make prod-down` | Stop production services |
| `make prod-logs` | Tail production logs |
| `make prod-ps` | List production containers |
| `make prod-restart` | Restart production services |
| `make prod-clean` | Remove production containers, volumes and images |

You can also run `docker compose` commands directly, e.g.:

```bash
# View logs for a specific service
docker compose logs -f backend

# Open a shell inside the backend container
docker exec -it nss-backend-dev bash
```

## Services Overview

| Service | Technology | Dev port | Notes |
|---|---|---|---|
| **frontend** | Next.js 15 | 3000 | Hot-reload in dev |
| **backend** | FastAPI + Strawberry GraphQL | 8000 | Hot-reload in dev |
| **mongodb** | MongoDB 7 | 27017 | Initialised by `mongo-init.js` |
| **nginx** | Nginx alpine | 80 (dev) / 8080 (prod) | Reverse proxy and load balancer |
| **redis** | Redis 7 | 6379 | Optional — commented out by default in the development stack; uncomment the `redis` service in `docker-compose.yml` to enable it locally |

## SSL Certificates

Manage SSL certificates using the `ssl-setup.sh` script:

```bash
# Generate a self-signed certificate (for local HTTPS testing)
./scripts/ssl-setup.sh self-signed

# Obtain a Let's Encrypt certificate (requires a public domain)
./scripts/ssl-setup.sh letsencrypt

# Renew an existing Let's Encrypt certificate
./scripts/ssl-setup.sh renew
```

## Monitoring

The development stack exposes Prometheus metrics from the backend.

- **Prometheus:** `http://localhost:9090` — raw metrics scraping
- **Grafana:** `http://localhost:3001` — visual dashboards *(add the Grafana service to `docker-compose.yml` if not already running)*

Prometheus is configured via `monitoring/prometheus.yml`.

## Testing

### Backend (Python / pytest)

```bash
cd backend
pip install -r requirements.txt pytest httpx
pytest tests/ -v
```

Or inside the running container:

```bash
docker exec -it nss-backend-dev pytest tests/ -v
```

### Frontend (Next.js / ESLint)

```bash
cd frontend
npm ci
npm run lint   # ESLint
npm run build  # Type-check and production build
```

## CI/CD Pipeline

Every push and pull request targeting `master` triggers the GitHub Actions workflow defined in `.github/workflows/ci.yml`:

| Job | Steps |
|---|---|
| **Frontend – Lint & Build** | `npm ci` → `npm run lint` → `npm run build` |
| **Backend – Lint & Test** | `pip install` → `flake8` (max line length 120) → `pytest tests/` |

All checks must pass before a pull request can be merged.

## Contributing

We welcome contributions from the IIIT Hyderabad community and beyond!

### Workflow

1. **Fork** the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/Website.git
   cd Website
   ```
2. **Create a feature branch** from `master`:
   ```bash
   git checkout -b feat/short-description
   ```
   Branch naming conventions:
   - `feat/` — new feature
   - `fix/` — bug fix
   - `docs/` — documentation only
   - `chore/` — maintenance / tooling

3. **Make your changes**, following the code style guidelines below.

4. **Run the tests** locally to verify nothing is broken (see [Testing](#testing)).

5. **Commit** with a clear, descriptive message:
   ```bash
   git commit -m "feat: add event registration form"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/) style where possible.

6. **Push** your branch and **open a Pull Request** against `master`:
   ```bash
   git push origin feat/short-description
   ```
   Fill in the [PR template](.github/pull_request_template.md) fully.

7. **Address review feedback** and ensure all CI checks are green before requesting a final review.

### Code Style

- **Backend (Python):** Follow [PEP 8](https://peps.python.org/pep-0008/). Max line length is **120** characters (enforced by `flake8`).
- **Frontend (TypeScript/React):** Follow the ESLint configuration in `frontend/eslint.config.mjs`. Run `npm run lint` before committing.
- Do **not** commit secrets, credentials, or personal data.
- Keep pull requests focused — one logical change per PR.

### Reporting Issues

Use the GitHub issue templates:
- [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)
- [Question](.github/ISSUE_TEMPLATE/question.md)

### AI-Generated Code Policy

Before submitting a PR, confirm that you have read and complied with the **NSS IIIT Hyderabad Generative AI Policy** (see the PR checklist in the pull request template).
