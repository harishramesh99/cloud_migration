import express from 'express';
import prescriptionController from '../../controllers/prescriptionController.js';
import { Auth } from '../../middleware/auth.js';

const router = express.Router();

// Render all prescription list page
router.get('/', prescriptionController.listPrescriptions);

// Render prescription registration page
router.get(
  '/register',
  Auth.ensureDoctor,
  prescriptionController.renderRegisterPrescription
);

// Render prescription list page
router.get('/:id', prescriptionController.getPrescription);

// Render prescription edit page
router.get(
  '/edit/:id',
  Auth.ensureDoctor,
  prescriptionController.renderEditPrescription
);

export default router;
