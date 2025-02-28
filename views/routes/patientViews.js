import express from 'express';
import patientController from '../../controllers/patientController.js';

const router = express.Router();

// Render all patient list page
router.get('/', patientController.listPatients);

// Render patient registration page
router.get('/register', patientController.renderRegisterPatient);

// Render patient list page
router.get('/:id', patientController.getPatient);

// Render patient edit page
router.get('/edit/:id', patientController.renderEditPatient);

export default router;
