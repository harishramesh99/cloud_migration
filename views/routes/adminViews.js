import express from 'express';
import adminController from '../../controllers/adminController.js';

const router = express.Router();

// Define your routes here
router.get('/', adminController.getDashboardStats);

export default router;
