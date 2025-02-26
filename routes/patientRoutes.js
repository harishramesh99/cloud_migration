import express from 'express';
import patientController from '../controllers/patientController.js';

const router = express.Router();

// Patient API Endpoints (CRUD operations)
router.get('/', patientController.listPatients);
router.get('/:id', patientController.getPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);
router.post('/register', patientController.registerPatient);

export default router;
