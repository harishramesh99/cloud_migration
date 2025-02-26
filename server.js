import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import patientViews from './views/patientViews.js';
import doctorViews from './views/doctorViews.js';
import appointmentViews from './views/appointmentViews.js';
import adminViews from './views/adminViews.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
app.use('/patients', patientViews);
app.use('/doctors', doctorViews);
app.use('/appointments', appointmentViews);
app.use('/admin', adminViews);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
