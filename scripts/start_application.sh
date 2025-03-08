#!/bin/bash

# Navigate to the application directory
cd /var/www/html/cloud_migration

# Stop any running instance
pm2 stop server || true

# Start the application with PM2
pm2 start server.js --name "cloud_migration" --node-args="--experimental-modules" -f

# Make PM2 startup on system boot
pm2 save
env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user