#!/bin/bash

# Navigate to the application directory
cd /var/www/html/cloud_migration

# Install dependencies
npm install

# Make sure the Firebase service account file has correct permissions
chmod 600 serviceAccountKey.json

# Check if the .env file exists, if not create it with sample values
# (you should replace these with your actual values)
if [ ! -f .env ]; then
  cat > .env << EOF
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
FIREBASE_DATABASE_URL=https://hpplus-14395.firebaseio.com
FIREBASE_API_KEY=AIzaSyCbEhS3WW-piNwehB57rqOwGrBrQMEjgDA
FIREBASE_AUTH_DOMAIN=hpplus-14395.firebaseapp.com
FIREBASE_PROJECT_ID=hpplus-14395
FIREBASE_STORAGE_BUCKET=hpplus-14395.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=215946804714
FIREBASE_APP_ID=1:215946804714:web:b91559a7481cbcf44d0693
EOF
fi

# Ensure proper ownership of all files
chown -R ec2-user:ec2-user /var/www/html/cloud_migration