import admin from 'firebase-admin';
import { initializeApp as initializeFirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse the JSON file

console.log("🔥 Checking Firebase Key:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY ? "Loaded ✅" : "Missing ❌");

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error("❌ FIREBASE_SERVICE_ACCOUNT_KEY is missing. Check your .env file!");
}

// ✅ Decode Base64 Key
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});


const db = admin.firestore();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeFirebaseApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { db, firebaseApp, firebaseConfig, auth, admin };