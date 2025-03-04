import Doctor from '../models/Doctor.js';
import xss from 'xss';

const sanitizeBody = (body) => {
  const sanitizedBody = {};
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      sanitizedBody[key] = xss(body[key]);
    }
  }
  return sanitizedBody;
};

const doctorController = {
  registerDoctor: async (req, res) => {
    const sanitizedBody = sanitizeBody(req.body);
    try {
      await Doctor.add(sanitizedBody);
      res.redirect('/doctors');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  getDoctor: async (req, res) => {
    try {
      const doc = await Doctor.doc(xss(req.params.id)).get();
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
    const sanitizedBody = sanitizeBody(req.body);
    try {
      await Doctor.update(xss(req.params.id), sanitizedBody);
      res.redirect('/doctors');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deleteDoctor: async (req, res) => {
    try {
      await Doctor.delete(xss(req.params.id));
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
