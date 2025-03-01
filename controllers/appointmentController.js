import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

const appointmentController = {
  registerAppointment: async (req, res) => {
    try {
      await Appointment.add(req.body);
      res.redirect('/appointments');
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
      res.redirect('/appointments');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      await Appointment.delete(req.params.id);
      res.redirect('/appointments');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  listAppointments: async (req, res) => {
    try {
      const snapshot = await Appointment.get();
      const appointments = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const appointment = doc.data();
          const doctorDoc = await Doctor.doc(appointment.doctor_id).get();
          const patientDoc = await Patient.doc(appointment.patient_id).get();
          return {
            id: doc.id,
            ...appointment,
            doctor: doctorDoc.data(),
            patient: patientDoc.data(),
          };
        })
      );
      res.render('./appointment/appointments', { appointments });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  renderRegisterAppointment: async (req, res) => {
    const patients = await Patient.get();
    const doctors = await Doctor.get();

    const patientList = patients.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const doctorList = doctors.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.render('./appointment/bookAppointment', {
      patientList,
      doctorList,
    });
  },

  renderEditAppointment: async (req, res) => {
    const appointmentDoc = await Appointment.doc(req.params.id).get();
    const appointment = appointmentDoc.data();
    const patients = await Patient.get();
    const doctors = await Doctor.get();

    const patientList = patients.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const doctorList = doctors.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.render('./appointment/editAppointment', {
      appointment: { ...appointment, id: req.params.id },
      patientList,
      doctorList,
    });
  },
};

export default appointmentController;
