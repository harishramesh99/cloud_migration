import { db } from '../config/db.js';

const User = {
  add: (data) => db.collection('Users').add(data),
  doc: (id) => db.collection('Users').doc(id),
  get: () => db.collection('Users').get(),
  update: (id, data) => db.collection('Users').doc(id).update(data),
  delete: (id) => db.collection('Users').doc(id).delete(),
};

export default User;
