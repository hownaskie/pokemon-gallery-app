#!/bin/sh
set -e

# Load secrets from the single file safely
if [ -f "$SECRETS_FILE" ]; then
  echo "Loading secrets from $SECRETS_FILE"
  while IFS='=' read -r key value; do
    # Skip comments and empty lines
    case "$key" in
      ''|\#*) continue ;;
    esac
    export "$key=$value"
    echo "Exported $key"
  done < "$SECRETS_FILE"
else
  echo "ERROR: Secrets file $SECRETS_FILE not found!"
  exit 1
fi

# Validate SUPABASE_URL
if [ -z "$VITE_SUPABASE_URL" ]; then
  echo "ERROR: VITE_SUPABASE_URL is required!"
  exit 1
fi

if ! echo "$VITE_SUPABASE_URL" | grep -Eq '^https?://'; then
  echo "ERROR: VITE_SUPABASE_URL is invalid: $VITE_SUPABASE_URL"
  exit 1
fi

# Inject runtime config
echo "Injecting runtime config..."
sed -i "s|__SUPABASE_URL__|$VITE_SUPABASE_URL|g" /usr/share/nginx/html/runtime-config.js
sed -i "s|__SUPABASE_ANON_KEY__|$VITE_SUPABASE_ANON_KEY|g" /usr/share/nginx/html/runtime-config.js
sed -i "s|__POKEMON_API_URL__|$VITE_POKEMON_API_URL|g" /usr/share/nginx/html/runtime-config.js

exec "$@"