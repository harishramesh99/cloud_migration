import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';

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

// Set EJS as the view engine
app.set('view engine', 'ejs');

// View Routes (Render Pages)
app.use('/patients', patientViews);
app.use('/doctors', doctorViews);
app.use('/appointments', appointmentViews);
app.use('/admin', adminViews);
app.use('/prescriptions', prescriptionViews);

// API Routes (CRUD Operations)
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
