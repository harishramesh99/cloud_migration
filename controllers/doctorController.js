import Doctor from '../models/Doctor.js';

const doctorController = {
  registerDoctor: async (req, res) => {
    try {
      await Doctor.add(req.body);
      res.redirect('/doctors');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  getDoctor: async (req, res) => {
    try {
      const doc = await Doctor.doc(req.params.id).get();
      if (!doc.exists) {
        return res
          .status(404)
          .json({ success: false, error: 'Doctor not found' });
      }
      res.json({ success: true, data: doc.data() });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  updateDoctor: async (req, res) => {
    try {
      await Doctor.update(req.params.id, req.body);
      res.redirect('/doctors');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deleteDoctor: async (req, res) => {
    try {
      await Doctor.delete(req.params.id);
      res.redirect('/doctors');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  listDoctors: async (req, res) => {
    try {
      const snapshot = await Doctor.get();
      const doctors = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.render('./doctor/doctors', { doctors });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  renderRegisterDoctor: (req, res) => {
    res.render('./doctor/registerDoctor');
  },

  renderEditDoctor: async (req, res) => {
    const doctor = await Doctor.doc(req.params.id).get();
    res.render('./doctor/editDoctor', { doctor });
  },
};

export default doctorController;
