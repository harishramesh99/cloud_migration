import express from 'express';
import appointmentController from '../controllers/appointmentController.js';

const router = express.Router();

// Appointment API Endpoints
router.get('/', appointmentController.listAppointments);
router.get('/:id', appointmentController.getAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.cancelAppointment);
router.post('/book', appointmentController.bookAppointment);

export default router;
