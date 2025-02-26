import Appointment from '../models/Appointment.js';

const bookAppointment = (req, res) => {
  Appointment.add(req.body)
    .then((docRef) => res.status(201).json({ id: docRef.id }))
    .catch((err) => res.status(400).json(err));
};

const getAppointment = (req, res) => {
  Appointment.doc(req.params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json(doc.data());
    })
    .catch((err) => res.status(400).json(err));
};

const updateAppointment = (req, res) => {
  Appointment.doc(req.params.id)
    .update(req.body)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(400).json(err));
};

const cancelAppointment = (req, res) => {
  Appointment.doc(req.params.id)
    .delete()
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(400).json(err));
};

const listAppointments = (req, res) => {
  Appointment.get()
    .then((snapshot) => {
      const appointments = [];
      snapshot.forEach((doc) =>
        appointments.push({ id: doc.id, ...doc.data() })
      );
      res.render('appointments', { appointments });
    })
    .catch((err) => res.status(400).json(err));
};

const renderBookAppointment = (req, res) => {
  res.render('bookAppointment');
};

export default {
  bookAppointment,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  listAppointments,
  renderBookAppointment,
};
