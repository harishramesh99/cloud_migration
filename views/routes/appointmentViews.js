import express from 'express';
import appointmentController from '../../controllers/appointmentController.js';
import { Auth } from '../../middleware/auth.js';

const router = express.Router();

// Render all appointment list page
router.get('/', appointmentController.listAppointments);

// Render appointment registration page
router.get(
  '/register',
  Auth.ensureDoctor,
  appointmentController.renderRegisterAppointment
);

// Render appointment list page
router.get('/:id', appointmentController.getAppointment);

// Render appointment edit page
router.get(
  '/edit/:id',
  Auth.ensureDoctor,
  appointmentController.renderEditAppointment
);

export default router;
