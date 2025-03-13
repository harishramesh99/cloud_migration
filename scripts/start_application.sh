#!/bin/bash
cd /var/www/html/cloud_migration

echo "🔥 Starting application..."
pm2 stop cloud_migration || true
pm2 start server.js --name "cloud_migration" --node-args="--experimental-modules" -f
pm2 save
pm2 restart cloud_migration
