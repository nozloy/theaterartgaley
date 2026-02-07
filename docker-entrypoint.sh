#!/bin/sh
set -e

# Fix permissions for data directory
if [ -d "/app/data" ]; then
    echo "Fixing permissions for /app/data..."
    chown -R node:node /app/data
fi

# Execute the command as node user
# Use gosu if available, otherwise fallback to su-exec or su
if command -v gosu > /dev/null; then
    exec gosu node "$@"
else
    echo "gosu not found, running as current user"
    exec "$@"
fi
