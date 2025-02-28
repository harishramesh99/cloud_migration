import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import { googleLogin, googleLogout } from './auth/authService.js';
import { trackUserSession } from './auth/sessionTracker.js';
import { firebaseConfig } from './config/db.js';

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

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use((req, res, next) => {
  res.locals.firebaseClientKeys = firebaseConfig;
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

// Google Login Route
app.get('/auth/google', async (req, res) => {
  try {
    await googleLogin();
    res.redirect('/dashboard'); // Redirect to dashboard after login
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Google Logout Route
app.get('/auth/logout', async (req, res) => {
  try {
    await googleLogout();
    res.redirect('/'); // Redirect to home page after logout
  } catch (error) {
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
});

// Track User Session
trackUserSession((user) => {
  if (user) {
    console.log('User is logged in:', user);
    // Update server state or session data as needed
  } else {
    console.log('User is logged out');
    // Update server state or session data as needed
  }
});

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
