import { db } from '../config/db.js';

const Prescription = {
  add: (data) => db.collection('Prescriptions').add(data),
  doc: (id) => db.collection('Prescriptions').doc(id),
  get: () => db.collection('Prescriptions').get(),
  update: (id, data) => db.collection('Prescriptions').doc(id).update(data),
  delete: (id) => db.collection('Prescriptions').doc(id).delete(),
};

export default Prescription;
