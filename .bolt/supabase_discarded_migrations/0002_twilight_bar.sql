/*
  # Additional Policies and Optimizations
  
  1. Changes
    - Add policy for appointment cancellation
    - Add check constraint for business hours
    - Add performance indexes
  
  2. Security
    - Policy ensures users can only cancel their own scheduled appointments
*/

-- Add policy for canceling appointments
CREATE POLICY "Users can cancel their own appointments" ON appointments
  FOR UPDATE USING (
    auth.uid() = patient_id 
    AND status = 'scheduled'
  )
  WITH CHECK (
    status = 'canceled'
  );

-- Add check constraint to ensure appointment time is within business hours
ALTER TABLE appointments
  ADD CONSTRAINT appointment_time_check 
  CHECK (
    appointment_time >= '08:00:00' 
    AND appointment_time <= '18:00:00'
  );

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_appointments_patient 
  ON appointments(patient_id, appointment_date);

CREATE INDEX IF NOT EXISTS idx_appointments_doctor 
  ON appointments(doctor_id, appointment_date);

CREATE INDEX IF NOT EXISTS idx_doctor_schedule_availability 
  ON doctor_schedule(doctor_id, day_of_week);