import express from 'express';
import appointmentController from '../controllers/appointmentController.js';

const router = express.Router();

// Appointment API Endpoints (CRUD operations)
router.get('/', appointmentController.listAppointments);
router.get('/:id', appointmentController.getAppointment);
router.post('/edit/:id', appointmentController.updateAppointment);
router.post('/delete/:id', appointmentController.deleteAppointment);
router.post('/register', appointmentController.registerAppointment);

export default router;
