import express from 'express';
import doctorController from '../controllers/doctorController';

const router = express.Router();

router.post('/register', doctorController.registerDoctor);
router.get('/:id', doctorController.getDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

export default router;
