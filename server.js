import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import checkLoggedIn from './helpers/checkLoggedIn.js';
import { firebaseConfig } from './config/db.js';

import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';

// Import Views
import patientViews from './views/routes/patientViews.js';
import doctorViews from './views/routes/doctorViews.js';
import appointmentViews from './views/routes/appointmentViews.js';
import adminViews from './views/routes/adminViews.js';
import prescriptionViews from './views/routes/prescriptionViews.js';

// Import API Routes
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, '../serviceAccountKey.json')));

const app = express();
const PORT = process.env.PORT || 3000;

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
