import express from 'express';
import appointmentController from '../controllers/appointmentController';

const router = express.Router();

router.post('/book', appointmentController.bookAppointment);
router.get('/:id', appointmentController.getAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.cancelAppointment);
router.get('/', appointmentController.listAppointments);

export default router;
