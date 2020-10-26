#!/bin/bash

# Get env var from args form the container
api_hostname=$(echo $API_HOSTNAME)
api_port=$(echo $API_PORT)

# Build an .env file with those variables
echo "REACT_APP_API_HOSTNAME=$api_hostname
REACT_APP_API_PORT=$api_port" >> /app/.env

npm run build

serve -s build -l 80