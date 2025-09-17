#!/bin/bash

sudo -i bash <<EOF

# ------------------------------
# Deployment Script for EC2
# ------------------------------

# Ensure the following environment variables are set on your EC2 instance:
# DOCKER_USER  -> Your Docker Hub username
# DOCKER_PAT   -> Your Docker Hub Personal Access Token
# DOCKER_DIR   -> Path to your docker-compose folder (e.g., /home/ubuntu/docker)

# Check required environment variables
if [[ -z "$DOCKER_USER" || -z "$DOCKER_PAT" ]]; then
  echo "Error: Missing required environment variables."
  echo "Please set DOCKER_USER, DOCKER_PAT"
  exit 1
fi

echo "***********************************"
echo "Navigate to the docker folder"
echo "***********************************"
cd /home/ubuntu/docker

echo "***********************************"
echo "Logging in to Docker Hub using PAT"
echo "***********************************"
echo "$DOCKER_PAT" | docker login -u "$DOCKER_USER" --password-stdin

# # Pull latest image
# docker pull "$DOCKER_USER/pokemon-app:latest"

# # Stop existing container
# docker compose -f /home/ubuntu/docker/docker-compose.yaml down || true

# # Start container with injected secrets
# docker run -d \
#   -e VITE_SUPABASE_URL="$VITE_SUPABASE_URL" \
#   -e VITE_SUPABASE_ANON_KEY="$VITE_SUPABASE_ANON_KEY" \
#   -e VITE_POKEMON_API_URL="$VITE_POKEMON_API_URL" \
#   "$DOCKER_USER/pokemon-app:latest"

echo "***********************************"
echo "Stop the application"
echo "***********************************"
docker compose down

echo "***********************************"
echo "Removing all docker images"
echo "***********************************"
docker image prune -a -f

echo "***********************************"
echo "Start the application"
echo "***********************************"
docker compose up -d

echo "***********************************"
echo "Application is now running!"
echo "***********************************"
EOF