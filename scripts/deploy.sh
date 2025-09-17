#!/bin/bash

# ------------------------------
# Deployment Script for EC2
# ------------------------------

# Ensure the following environment variables are set on your EC2 instance:
# DOCKER_USER  -> Your Docker Hub username
# DOCKER_PAT   -> Your Docker Hub Personal Access Token
# DOCKER_DIR   -> Path to your docker-compose folder (e.g., /home/ubuntu/docker)

# Check required environment variables
if [[ -z "$DOCKER_USER" || -z "$DOCKER_PAT" || -z "$DOCKER_DIR" ]]; then
  echo "Error: Missing required environment variables."
  echo "Please set DOCKER_USER, DOCKER_PAT, and DOCKER_DIR."
  exit 1
fi

sudo -i bash <<EOF
echo "***********************************"
echo "Navigate to the docker folder"
echo "***********************************"
cd /home/ubuntu/docker

echo "***********************************"
echo "Logging in to Docker Hub using PAT"
echo "***********************************"
echo "$DOCKER_PAT" | docker login -u "$DOCKER_USER" --password-stdin

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