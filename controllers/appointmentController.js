import pool from '../config/database.js';

export const createAppointment = async (req, res) => {
  try {
    const { doctor_id, appointment_date, appointment_time } = req.body;
    const patient_id = req.session.userId;

    // Check if slot is available
    const [existing] = await pool.query(
      'SELECT id FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND status != "canceled"',
      [doctor_id, appointment_date, appointment_time]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Time slot not available' });
    }

    // Create appointment
    await pool.query(
      'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, "scheduled")',
      [patient_id, doctor_id, appointment_date, appointment_time]
    );

    res.status(201).json({ message: 'Appointment scheduled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const [appointments] = await pool.query(
      `SELECT a.*, d.first_name, d.last_name, d.specialization 
       FROM appointments a 
       JOIN doctors d ON a.doctor_id = d.id 
       WHERE a.patient_id = ?`,
      [req.session.userId]
    );
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};