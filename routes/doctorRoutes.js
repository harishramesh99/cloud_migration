import express from 'express';
import doctorController from '../controllers/doctorController.js';

const router = express.Router();

// Doctor API Endpoints
router.get('/', doctorController.listDoctors);
router.get('/:id', doctorController.getDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);
router.post('/register', doctorController.registerDoctor);

export default router;
