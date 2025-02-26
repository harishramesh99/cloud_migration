import { db } from '../config/db.js';

const Appointment = {
  add: (data) => db.collection('Appointments').add(data),
  doc: (id) => db.collection('Appointments').doc(id),
  get: () => db.collection('Appointments').get(),
};

export default Appointment;
