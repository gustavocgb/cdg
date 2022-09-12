#!bin/bash

set -e

cd /home/ubuntu/crawler

echo "Login..."
echo $REGISTRY_PASSWORD | docker login "$REGISTRY_IP:$REGISTRY_PORT" -u $REGISTRY_USERNAME --password-stdin

echo "Pulling image"
docker pull $REGISTRY_IP:$REGISTRY_PORT/crawler:staging

echo "build"
docker-compose build crawler

echo "starting app..."
docker-compose up -d

echo "coping .env"
docker cp aws-sgm/.env crawler_crawler_1:/app

