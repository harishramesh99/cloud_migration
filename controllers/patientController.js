import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';

const patientController = {
  registerPatient: (req, res) => {
    Patient.add(req.body)
      .then((docRef) => res.status(201).json({ id: docRef.id }))
      .catch((err) => res.status(400).json(err));
  },
  getPatient: (req, res) => {
    Patient.doc(req.params.id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(doc.data());
      })
      .catch((err) => res.status(400).json(err));
  },
  updatePatient: (req, res) => {
    Patient.doc(req.params.id)
      .update(req.body)
      .then(() => res.json({ success: true }))
      .catch((err) => res.status(400).json(err));
  },
  deletePatient: (req, res) => {
    Patient.doc(req.params.id)
      .delete()
      .then(() => res.json({ success: true }))
      .catch((err) => res.status(400).json(err));
  },
  listPatients: (req, res) => {
    Patient.get()
      .then((snapshot) => {
        const patients = [];
        snapshot.forEach((doc) => patients.push({ id: doc.id, ...doc.data() }));
        res.render('patients', { patients });
      })
      .catch((err) => res.status(400).json(err));
  },
  renderRegisterPatient: (req, res) => {
    // Logic to render the patient registration page
    res.send('Render patient registration page');
  },
};

export default patientController;
