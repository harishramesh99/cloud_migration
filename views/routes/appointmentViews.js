import express from 'express';
import appointmentController from '../../controllers/appointmentController.js';

const router = express.Router();

// Render all doctor list page
router.get('/', appointmentController.listAppointments);

// Render doctor registration page
router.get('/register', appointmentController.registerAppointment);

// Render doctor list page
router.get('/:id', appointmentController.getAppointment);

// Render doctor edit page
router.get('/edit/:id', appointmentController.renderEditAppointment);

export default router;
