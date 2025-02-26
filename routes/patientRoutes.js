import express from 'express';
import patientController from '../controllers/patientController';

const router = express.Router();

router.post('/register', patientController.registerPatient);
router.get('/:id', patientController.getPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

export default router;
