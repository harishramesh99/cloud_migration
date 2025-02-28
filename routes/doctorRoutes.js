import express from 'express';
import doctorController from '../controllers/doctorController.js';

const router = express.Router();

// Doctor API Endpoints (CRUD operations)
router.get('/', doctorController.listDoctors);
router.get('/:id', doctorController.getDoctor);
router.post('/edit/:id', doctorController.updateDoctor);
router.post('/delete/:id', doctorController.deleteDoctor);
router.post('/register', doctorController.registerDoctor);

export default router;
