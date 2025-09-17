#!/bin/sh
set -e

# Load secrets from the single file
if [ -f "$SECRETS_FILE" ]; then
  echo "Loading secrets from $SECRETS_FILE"
  export $(grep -v '^#' "$SECRETS_FILE" | xargs)
fi

# Validate URL
if ! echo "$VITE_SUPABASE_URL" | grep -Eq '^https?://'; then
  echo "ERROR: SUPABASE_URL is invalid: $VITE_SUPABASE_URL"
  exit 1
fi

# Inject runtime config
echo "Injecting runtime config..."
sed -i "s|__SUPABASE_URL__|$VITE_SUPABASE_URL|g" /usr/share/nginx/html/runtime-config.js
sed -i "s|__SUPABASE_ANON_KEY__|$VITE_SUPABASE_ANON_KEY|g" /usr/share/nginx/html/runtime-config.js
sed -i "s|__POKEMON_API_URL__|$VITE_POKEMON_API_URL|g" /usr/share/nginx/html/runtime-config.js

exec "$@"
