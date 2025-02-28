import express from 'express';
import prescriptionController from '../controllers/prescriptionController.js';

const router = express.Router();

// Prescription API Endpoints (CRUD operations)
router.get('/', prescriptionController.listPrescriptions);
router.get('/:id', prescriptionController.getPrescription);
router.post('/edit/:id', prescriptionController.updatePrescription);
router.post('/delete/:id', prescriptionController.deletePrescription);
router.post('/register', prescriptionController.registerPrescription);

export default router;
