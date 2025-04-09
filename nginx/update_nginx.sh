#!/bin/bash

EUREKA_URL="http://eureka-server:8761/eureka/apps/CHAT-APP"
NGINX_UPSTREAM_CONF="/etc/nginx/upstream.conf"

# Ensure upstream.conf is NOT a directory
if [ -d "$NGINX_UPSTREAM_CONF" ]; then
    echo "Error: $NGINX_UPSTREAM_CONF is a directory, removing..."
    rm -rf "$NGINX_UPSTREAM_CONF"
fi

# Ensure the file exists before writing
if [ ! -f "$NGINX_UPSTREAM_CONF" ]; then
    touch "$NGINX_UPSTREAM_CONF"
fi

# Fetch registered instances from Eureka
INSTANCES=$(curl -s $EUREKA_URL | grep -oP '(?<=<homePageUrl>).*?(?=</homePageUrl>)')

# Write the updated backend servers
echo "upstream backend {" > "$NGINX_UPSTREAM_CONF"
for INSTANCE in $INSTANCES; do
    echo "    server $INSTANCE;" >> "$NGINX_UPSTREAM_CONF"
done
echo "}" >> "$NGINX_UPSTREAM_CONF"

# Reload NGINX to apply changes
nginx -s reload