import pool from '../config/database.js';

export const getDoctors = async (req, res) => {
  try {
    const [doctors] = await pool.query('SELECT id, first_name, last_name, specialization FROM doctors');
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const [doctor] = await pool.query(
      'SELECT id, first_name, last_name, specialization FROM doctors WHERE id = ?',
      [req.params.id]
    );
    if (doctor.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDoctorSchedule = async (req, res) => {
  try {
    const [schedule] = await pool.query(
      'SELECT * FROM doctor_schedule WHERE doctor_id = ?',
      [req.params.id]
    );
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};