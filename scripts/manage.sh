#!/usr/bin/env bash

set -e

# Select the compose file and env file for the target environment.
if [ "$1" == "development" ]; then
  ENV_FILE=".env.development"
  COMPOSE_FILE="docker-compose.yml"
  BACKEND_SERVICES=(backend)
  FRONTEND_SERVICES=(frontend)
else
  ENV_FILE=".env.production"
  COMPOSE_FILE="docker-compose.prod.yml"
  BACKEND_SERVICES=(backend-1)
  FRONTEND_SERVICES=(frontend-1)
fi

if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

DC="docker-compose -f $COMPOSE_FILE"

# Build services
function build() {
  echo "Building backend..."
  $DC build "${BACKEND_SERVICES[@]}"

  echo "Building frontend..."
  $DC build "${FRONTEND_SERVICES[@]}"
}

# Start services
function start() {
  echo "Starting services..."
  $DC up -d
}

# Stop services
function stop() {
  echo "Stopping services..."
  $DC down
}

# Show status
function status() {
  $DC ps
}

# Restart services
function restart() {
  stop
  start
}

# Show logs
function logs() {
  SERVICE="$1"
  $DC logs -f "$SERVICE"
}

case "$2" in
  "build")
    build
    ;;
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "status")
    status
    ;;
  "restart")
    restart
    ;;
  "logs")
    logs "$3"
    ;;
  *)
    echo "Usage: $0 {development|production} {build|start|stop|status|restart|logs [service]}"
    ;;
esac
