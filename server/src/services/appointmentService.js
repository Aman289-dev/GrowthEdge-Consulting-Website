import Appointment from '../models/Appointment.js';

export async function createAppointment(data) {
  const appointment = new Appointment(data);
  return await appointment.save();
}
