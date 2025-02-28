import Prescription from '../models/Prescription.js';

const prescriptionController = {
  registerPrescription: async (req, res) => {
    try {
      await Prescription.add(req.body);
      res.redirect('./prescription/prescriptions');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  getPrescription: async (req, res) => {
    try {
      const doc = await Prescription.doc(req.params.id).get();
      if (!doc.exists) {
        return res
          .status(404)
          .json({ success: false, error: 'Prescription not found' });
      }
      res.json({ success: true, data: doc.data() });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  updatePrescription: async (req, res) => {
    try {
      await Prescription.update(req.params.id, req.body);
      res.redirect('./prescription/prescriptions');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deletePrescription: async (req, res) => {
    try {
      await Prescription.delete(req.params.id);
      res.redirect('./prescription/prescriptions');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  listPrescriptions: async (req, res) => {
    try {
      const snapshot = await Prescription.get();
      const prescriptions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.render('./prescription/prescriptions', { prescriptions });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  renderRegisterPrescription: (req, res) => {
    res.render('./prescription/registerPrescription');
  },

  renderEditPrescription: async (req, res) => {
    const prescription = await Prescription.doc(req.params.id).get();
    res.render('./prescription/editPrescription', { prescription });
  },
};

export default prescriptionController;
