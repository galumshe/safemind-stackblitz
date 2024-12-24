import express from 'express';
import { createAppointment, getPatientAppointments } from '../controllers/appointmentController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/', isAuthenticated, createAppointment);
router.get('/my-appointments', isAuthenticated, getPatientAppointments);

export default router;