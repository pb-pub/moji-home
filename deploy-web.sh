#!/bin/bash
# Local Server Deploy Script
# Pulls from Git and copies public files to the webroot
set -e

# Configuration
REPO_PATH="$(pwd)"
WEBROOT_PATH="/var/www/moji-ch.com/html"

echo "Starting deployment from $REPO_PATH to $WEBROOT_PATH..."

# 1. Pull latest changes
echo "Pulling latest changes from master..."
git pull origin master

# 2. Sync public files to webroot
# Using rsync to efficiently copy only the necessary folders and index.html
echo "Deploying files to webroot..."
rsync -avz --delete \
    --include='index.html' \
    --include='css/***' \
    --include='js/***' \
    --include='assets/***' \
    --exclude='*' \
    "$REPO_PATH/" "$WEBROOT_PATH/"

echo "Deployment complete. Live at https://moji-ch.com"
