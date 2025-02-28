import Appointment from '../models/Appointment.js';

const appointmentController = {
  registerAppointment: async (req, res) => {
    try {
      await Appointment.add(req.body);
      res.redirect('./appointment/appointments');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  getAppointment: async (req, res) => {
    try {
      const doc = await Appointment.doc(req.params.id).get();
      if (!doc.exists) {
        return res
          .status(404)
          .json({ success: false, error: 'Appointment not found' });
      }
      res.json({ success: true, data: doc.data() });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      await Appointment.update(req.params.id, req.body);
      res.redirect('./appointment/appointments');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      await Appointment.delete(req.params.id);
      res.redirect('./appointment/appointments');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  listAppointments: async (req, res) => {
    try {
      const snapshot = await Appointment.get();
      const appointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.render('./appointment/appointments', { appointments });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  renderRegisterAppointment: (req, res) => {
    res.render('./appointment/registerAppointment');
  },

  renderEditAppointment: async (req, res) => {
    const appointment = await Appointment.doc(req.params.id).get();
    res.render('./appointment/editAppointment', { appointment });
  },
};

export default appointmentController;
