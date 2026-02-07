#!/bin/sh
set -e

# Log current user
echo "Running as user: $(id -u):$(id -g)"

# Fix permissions for data directory ONLY if running as root
if [ "$(id -u)" = "0" ] && [ -d "/app/data" ]; then
    echo "Fixing permissions for /app/data..."
    chown -R node:node /app/data
else
    echo "Not running as root or /app/data missing. Skipping permission fix."
fi

# Execute the command
# If root, drop to node user
if [ "$(id -u)" = "0" ]; then
    if command -v gosu > /dev/null; then
        exec gosu node "$@"
    else
        echo "gosu not found, running as root (not recommended)"
        exec "$@"
    fi
else
    # Already non-root, just run
    echo "Running as non-root, proceeding..."
    exec "$@"
fi
