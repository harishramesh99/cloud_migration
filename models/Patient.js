import { db } from '../config/db.js';

const Patient = {
  add: (data) => db.collection('Patients').add(data),
  doc: (id) => db.collection('Patients').doc(id),
  get: () => db.collection('Patients').get(),
  update: (id, data) => db.collection('Patients').doc(id).update(data),
  delete: (id) => db.collection('Patients').doc(id).delete(),
};

export default Patient;
