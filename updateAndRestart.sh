#!bin/bash

set -e

cd /home/ubuntu/crawler

echo "Login..."
echo $REGISTRY_PASSWORD | sudo docker login "$REGISTRY_IP:$REGISTRY_PORT" -u $REGISTRY_USERNAME --password-stdin

echo "Pulling image"
sudo docker pull $REGISTRY_IP:$REGISTRY_PORT/crawler:stable

echo "Build"
sudo docker-compose build crawler

echo "Starting app..."
sudo docker-compose up -d

echo "Coping .env"
sudo docker cp aws-sgm/.env crawler_crawler_1:/app
