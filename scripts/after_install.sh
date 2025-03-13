#!/bin/bash
cd /var/www/html/cloud_migration

echo "🔑 Checking for Firebase Key..."
if [ ! -f serviceAccountKey.json ]; then
    echo "🚨 Firebase key not found! Fetching from AWS CodeBuild environment..."
    echo $FIREBASE_AUTH_KEY_BASE64 | base64 --decode > serviceAccountKey.json
    chmod 600 serviceAccountKey.json
fi

echo "✅ Firebase key loaded!"
