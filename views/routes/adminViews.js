import express from 'express';
import adminController from '../../controllers/adminController.js';
import { Auth } from '../../middleware/auth.js';

const router = express.Router();

// Define your routes here
router.get('/', Auth.ensureAdmin, adminController.getDashboardStats);

export default router;
