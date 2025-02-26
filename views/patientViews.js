import express from 'express';
import patientController from '../controllers/patientController.js';

const router = express.Router();

router.post('/register', patientController.registerPatient);
router.get('/:id', patientController.getPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);
router.get('/', patientController.listPatients);
router.get('/register', patientController.renderRegisterPatient);

export default router;
