import express from 'express';
import doctorController from '../controllers/doctorController.js';

const router = express.Router();

router.post('/register', doctorController.registerDoctor);
router.get('/:id', doctorController.getDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);
router.get('/', doctorController.listDoctors);
router.get('/register', doctorController.renderRegisterDoctor);

export default router;
