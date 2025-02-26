import { db } from '../config/db.js';

const Schedule = {
  add: (data) => db.collection('Schedules').add(data),
  doc: (id) => db.collection('Schedules').doc(id),
  get: () => db.collection('Schedules').get(),
  update: (id, data) => db.collection('Schedules').doc(id).update(data),
  delete: (id) => db.collection('Schedules').doc(id).delete(),
};

export default Schedule;
