import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import checkLoggedIn from './helpers/checkLoggedIn.js';
import { firebaseConfig } from './config/db.js';
import cookieParser from 'cookie-parser';
import AWS from 'aws-sdk';

// Import routes
import authRouter from './routes/auth.js';
import patientViews from './views/routes/patientViews.js';
import doctorViews from './views/routes/doctorViews.js';
import appointmentViews from './views/routes/appointmentViews.js';
import adminViews from './views/routes/adminViews.js';
import prescriptionViews from './views/routes/prescriptionViews.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configure AWS SDK
const secretsManager = new AWS.SecretsManager({
  region: process.env.AWS_REGION || 'us-east-1'
});

// Function to get Firebase key from Secrets Manager
async function getFirebaseKey() {
  try {
    const data = await secretsManager.getSecretValue({
      SecretId: process.env.FIREBASE_SECRET_NAME || 'your-firebase-secret-name'
    }).promise();
    
    // Parse the secret and store it in an environment variable
    const secret = JSON.parse(data.SecretString);
    process.env.FIREBASE_KEY = secret.firebaseKey; // Adjust the property name based on your secret structure
    
    console.log('Firebase key retrieved successfully from Secrets Manager');
  } catch (err) {
    console.error('Error retrieving Firebase key from Secrets Manager:', err);
  }
}

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(async (req, res, next) => {
  res.locals.firebaseClientKeys = firebaseConfig;
  res.locals.title = 'HP Plus';
  // Check if user is logged in
  const response = await checkLoggedIn(req.cookies.session);
  if (response.status === true) {
    res.locals.user = {
      email: response.email,
      uid: response.uid,
      role: response.role,
    };
  }
  next();
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// View Routes (Render Pages)
app.use('/patients', patientViews);
app.use('/doctors', doctorViews);
app.use('/appointments', appointmentViews);
app.use('/dashboard', adminViews);
app.use('/prescriptions', prescriptionViews);

// API Routes (CRUD Operations)
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

app.get('/', (req, res) => {
  res.redirect('/doctors');
});

app.use('/auth', authRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Start Server with AWS Secrets Manager integration
async function startServer() {
  // Retrieve Firebase key before starting the server
  await getFirebaseKey();
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();