#!/bin/sh
set -e

# Replace placeholders with actual env vars
envsubst < /usr/share/nginx/html/config.template.js \
  > /usr/share/nginx/html/config.js

exec "$@"