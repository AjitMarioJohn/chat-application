#!/bin/bash

EUREKA_URL="http://eureka-server:8761/eureka/apps/CHAT-APP"
NGINX_CONF="/etc/nginx/nginx.conf"

# Fetch registered instances from Eureka
INSTANCES=$(curl -s $EUREKA_URL | grep -oP '(?<=<homePageUrl>).*?(?=</homePageUrl>)')

# Update NGINX configuration dynamically
echo "upstream backend {" > $NGINX_CONF
for INSTANCE in $INSTANCES; do
    echo "    server $INSTANCE;" >> $NGINX_CONF
done
echo "}" >> $NGINX_CONF

# Reload NGINX to apply changes
nginx -s reload