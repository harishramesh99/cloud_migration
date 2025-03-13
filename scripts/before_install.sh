#!/bin/bash

# Create the deployment directory if it doesn't exist
if [ ! -d /var/www/html/cloud_migration ]; then
  mkdir -p /var/www/html/cloud_migration
fi

# Install Node.js if not already installed
if ! command -v node &> /dev/null; then
  curl -sL https://rpm.nodesource.com/setup_16.x | bash -
  yum install -y nodejs
fi

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
fi