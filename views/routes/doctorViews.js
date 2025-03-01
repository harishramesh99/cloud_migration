import express from 'express';
import doctorController from '../../controllers/doctorController.js';
import { Auth } from '../../middleware/auth.js';

const router = express.Router();

// Render all doctor list page
router.get('/', doctorController.listDoctors);

// Render doctor registration page
router.get(
  '/register',
  Auth.ensureAdmin,
  doctorController.renderRegisterDoctor
);

// Render doctor list page
router.get('/:id', doctorController.getDoctor);

// Render doctor edit page
router.get('/edit/:id', Auth.ensureAdmin, doctorController.renderEditDoctor);

export default router;
