import Doctor from '../models/Doctor.js';

const registerDoctor = (req, res) => {
  Doctor.add(req.body)
    .then((docRef) => res.status(201).json({ id: docRef.id }))
    .catch((err) => res.status(400).json(err));
};

const getDoctor = (req, res) => {
  Doctor.doc(req.params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.json(doc.data());
    })
    .catch((err) => res.status(400).json(err));
};

const updateDoctor = (req, res) => {
  Doctor.doc(req.params.id)
    .update(req.body)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(400).json(err));
};

const deleteDoctor = (req, res) => {
  Doctor.doc(req.params.id)
    .delete()
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(400).json(err));
};

const listDoctors = (req, res) => {
  Doctor.get()
    .then((snapshot) => {
      const doctors = [];
      snapshot.forEach((doc) => doctors.push({ id: doc.id, ...doc.data() }));
      res.render('doctors', { doctors });
    })
    .catch((err) => res.status(400).json(err));
};

const renderRegisterDoctor = (req, res) => {
  res.render('registerDoctor');
};

export default {
  registerDoctor,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  listDoctors,
  renderRegisterDoctor,
};
