#!/bin/bash
# Deploy moji-home static site to Apache webroot (moji-ch.com)
set -e

REMOTE_USER="${REMOTE_USER:-root}"
REMOTE_HOST="${REMOTE_HOST:-moji-ch.com}"
REMOTE_PATH="${REMOTE_PATH:-/var/www/moji-ch.com/html}"

echo "Deploying to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH ..."
rsync -avz --delete \
  --exclude '.git' \
  --exclude 'deploy-web.sh' \
  --exclude '.gitignore' \
  . "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

echo "Done. Live at https://moji-ch.com"
