import Patient from '../models/Patient.js';

const patientController = {
  registerPatient: async (req, res) => {
    try {
      const docRef = await Patient.add(req.body);
      res.status(201).json({ success: true, id: docRef.id });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  getPatient: async (req, res) => {
    try {
      const doc = await Patient.doc(req.params.id).get();
      if (!doc.exists) {
        return res
          .status(404)
          .json({ success: false, error: 'Patient not found' });
      }
      res.json({ success: true, data: doc.data() });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  updatePatient: async (req, res) => {
    try {
      await Patient.update(req.params.id, req.body);
      res.json({ success: true, message: 'Patient updated successfully' });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deletePatient: async (req, res) => {
    try {
      await Patient.delete(req.params.id);
      res.json({ success: true, message: 'Patient deleted successfully' });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  listPatients: async (req, res) => {
    try {
      const snapshot = await Patient.get();
      const patients = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.render('patients', { patients });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  renderRegisterPatient: (req, res) => {
    res.render('registerPatient'); // Changed from `res.send()`
  },
};

export default patientController;
