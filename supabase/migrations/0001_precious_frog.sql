/*
  # Create core tables for telemedicine system

  1. New Tables
    - `doctors`: Stores doctor information and credentials
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `specialization` (text)
      - `email` (text, unique)
      - `phone` (text)
    
    - `doctor_schedule`: Manages doctor availability
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, foreign key)
      - `day_of_week` (text)
      - `start_time` (time)
      - `end_time` (time)
    
    - `appointments`: Tracks patient appointments
      - `id` (uuid, primary key)
      - `patient_id` (uuid, foreign key)
      - `doctor_id` (uuid, foreign key)
      - `appointment_date` (date)
      - `appointment_time` (time)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  specialization text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Create doctor_schedule table
CREATE TABLE IF NOT EXISTS doctor_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id),
  day_of_week text NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  start_time time NOT NULL,
  end_time time NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES auth.users(id),
  doctor_id uuid NOT NULL REFERENCES doctors(id),
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text NOT NULL CHECK (status IN ('scheduled', 'completed', 'canceled')) DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policies for doctors table
CREATE POLICY "Doctors are viewable by everyone" ON doctors
  FOR SELECT USING (true);

-- Policies for doctor_schedule table
CREATE POLICY "Schedule is viewable by everyone" ON doctor_schedule
  FOR SELECT USING (true);

-- Policies for appointments table
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (auth.uid() = patient_id);

CREATE POLICY "Users can create their own appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update their own appointments" ON appointments
  FOR UPDATE USING (auth.uid() = patient_id);






-- -- Create doctors table
-- CREATE TABLE IF NOT EXISTS doctors (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   first_name VARCHAR(255) NOT NULL,
--   last_name VARCHAR(255) NOT NULL,
--   specialization VARCHAR(255) NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   phone VARCHAR(20)
-- );

-- -- Create doctor_schedule table
-- CREATE TABLE IF NOT EXISTS doctor_schedule (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   doctor_id INT NOT NULL,
--   day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
--   start_time TIME NOT NULL,
--   end_time TIME NOT NULL,
--   FOREIGN KEY (doctor_id) REFERENCES doctors(id)
-- );

-- -- Create appointments table
-- CREATE TABLE IF NOT EXISTS appointments (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   patient_id INT NOT NULL,
--   doctor_id INT NOT NULL,
--   appointment_date DATE NOT NULL,
--   appointment_time TIME NOT NULL,
--   status ENUM('scheduled', 'completed', 'canceled') DEFAULT 'scheduled',
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (patient_id) REFERENCES user(id),
--   FOREIGN KEY (doctor_id) REFERENCES doctors(id)
-- );