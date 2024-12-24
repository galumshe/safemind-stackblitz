import express from 'express';
import { getDoctors, getDoctorById, getDoctorSchedule } from '../controllers/doctorController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.get('/:id/schedule', getDoctorSchedule);

export default router;