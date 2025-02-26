import express from 'express';
import patientController from '../controllers/patientController.js';

const router = express.Router();

// Render patient list page
router.get('/', patientController.listPatients);

// Render patient registration page
router.get('/register', patientController.renderRegisterPatient);

export default router;
