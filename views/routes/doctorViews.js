import express from 'express';
import doctorController from '../../controllers/doctorController.js';

const router = express.Router();

// Render all doctor list page
router.get('/', doctorController.listDoctors);

// Render doctor registration page
router.get('/register', doctorController.renderRegisterDoctor);

// Render doctor list page
router.get('/:id', doctorController.getDoctor);

// Render doctor edit page
router.get('/edit/:id', doctorController.renderEditDoctor);

export default router;
