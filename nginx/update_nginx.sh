#!/bin/bash

EUREKA_URL="http://eureka-server:8761/eureka/apps/CHAT-APP"
NGINX_UPSTREAM_CONF="/etc/nginx/upstream.conf"

# Ensure upstream.conf is a file, not a directory
if [ -d "$NGINX_UPSTREAM_CONF" ]; then
    echo "Error: $NGINX_UPSTREAM_CONF is a directory. Removing..."
    rm -rf "$NGINX_UPSTREAM_CONF"
fi

# Create the file if missing
touch "$NGINX_UPSTREAM_CONF"

# Fetch registered instances from Eureka (extract only hostname)
INSTANCES=$(curl -s $EUREKA_URL | grep -oP '(?<=<hostName>).*?(?=</hostName>)')

# Update NGINX upstream configuration
echo "upstream backend {" > "$NGINX_UPSTREAM_CONF"
for INSTANCE in $INSTANCES; do
    echo "    server $INSTANCE:8080;" >> "$NGINX_UPSTREAM_CONF"  # Use service name instead of raw IP
done
echo "}" >> "$NGINX_UPSTREAM_CONF"

# Reload NGINX
nginx -s reload