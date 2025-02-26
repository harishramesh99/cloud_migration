import express from 'express';
import appointmentController from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/book', appointmentController.bookAppointment);
router.get('/:id', appointmentController.getAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.cancelAppointment);
router.get('/', appointmentController.listAppointments);
router.get('/book', appointmentController.renderBookAppointment);

export default router;
