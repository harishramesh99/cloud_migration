import express from 'express';
import prescriptionController from '../../controllers/prescriptionController.js';
import { Auth } from '../../middleware/auth.js';

const router = express.Router();

// Render all doctor list page
router.get('/', prescriptionController.listPrescriptions);

// Render doctor registration page
router.get(
  '/register',
  Auth.ensureAdmin,
  prescriptionController.renderRegisterPrescription
);

// Render doctor list page
router.get('/:id', prescriptionController.getPrescription);

// Render doctor edit page
router.get(
  '/edit/:id',
  Auth.ensureAdmin,
  prescriptionController.renderEditPrescription
);

export default router;
