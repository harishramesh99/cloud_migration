import express from 'express';
import patientController from '../../controllers/patientController.js';
import { Auth } from '../../middleware/auth.js';

const router = express.Router();

// Render all patient list page
router.get('/', patientController.listPatients);

// Render patient registration page
router.get(
  '/register',
  Auth.ensureAdmin || Auth.ensureDoctor,
  patientController.renderRegisterPatient
);

// Render patient list page
router.get('/:id', patientController.getPatient);

// Render patient edit page
router.get(
  '/edit/:id',
  Auth.ensureAdmin || Auth.ensureDoctor,
  patientController.renderEditPatient
);

export default router;
