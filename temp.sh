#!/usr/bin/env bash
set -e  # exit if any command fails

# Step 1: Remove stopped containers
echo "Pruning stopped containers..."
docker container prune -f

# Step 2: Remove all images if any exist
images=$(docker images -q)
if [ -n "$images" ]; then
    echo "Removing all Docker images..."
    docker rmi -f $images
else
    echo "No Docker images to remove."
fi

# Step 3: Restart containers using docker compose
echo "Starting containers with docker compose..."
docker compose -f docker-compose.yml up --build
