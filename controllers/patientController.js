import Patient from '../models/Patient.js';
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

const patientController = {
  registerPatient: async (req, res) => {
    const sanitizedBody = sanitizeBody(req.body);
    try {
      await Patient.add(sanitizedBody);
      res.redirect('/patients');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  getPatient: async (req, res) => {
    try {
      const doc = await Patient.doc(xss(req.params.id)).get();
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
    const sanitizedBody = sanitizeBody(req.body);
    try {
      await Patient.update(xss(req.params.id), sanitizedBody);
      res.redirect('/patients');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deletePatient: async (req, res) => {
    try {
      await Patient.delete(xss(req.params.id));
      res.redirect('/patients');
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
      // console.log(res.locals.user); // Grab user from locals
      res.render('./patient/patients', { patients });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  renderRegisterPatient: (req, res) => {
    res.render('./patient/registerPatient');
  },

  renderEditPatient: async (req, res) => {
    const patient = await Patient.doc(xss(req.params.id)).get();
    res.render('./patient/editPatient', { patient });
  },
};

export default patientController;
