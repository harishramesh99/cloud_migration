import { db } from '../config/db.js';

const Doctor = {
  add: (data) => db.collection('Doctors').add(data),
  doc: (id) => db.collection('Doctors').doc(id),
  get: () => db.collection('Doctors').get(),
  update: (id, data) => db.collection('Doctors').doc(id).update(data),
  delete: (id) => db.collection('Doctors').doc(id).delete(),
};

export default Doctor;
