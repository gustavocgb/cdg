#!/bin/bash

set -e

PRIVATE_KEY=$PRIVATE_KEY
eval $(ssh-agent -s)
echo "$PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null

sh disableHostKeyChecking.sh

DEPLOY_SERVERS=$DEPLOY_SERVERS

echo "deploying to $DEPLOY_SERVERS"
ssh ubuntu@$DEPLOY_SERVERS env REGISTRY_PASSWORD=$REGISTRY_PASSWORD REGISTRY_IP=$REGISTRY_IP REGISTRY_PORT=$REGISTRY_PORT REGISTRY_USERNAME=$REGISTRY_USERNAME 'bash' < ./updateAndRestart.sh $1
