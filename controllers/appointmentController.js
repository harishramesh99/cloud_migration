import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
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

const appointmentController = {
  registerAppointment: async (req, res) => {
    const sanitizedBody = sanitizeBody(req.body);
    try {
      await Appointment.add(sanitizedBody);
      res.redirect('/appointments');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  getAppointment: async (req, res) => {
    try {
      const doc = await Appointment.doc(xss(req.params.id)).get();
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
    const sanitizedBody = sanitizeBody(req.body);
    try {
      await Appointment.update(xss(req.params.id), sanitizedBody);
      res.redirect('/appointments');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      await Appointment.delete(xss(req.params.id));
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
          if (!appointment.doctor_id || !appointment.patient_id) {
            return undefined;
          }
          const doctorDoc = await Doctor.doc(appointment.doctor_id).get();
          const patientDoc = await Patient.doc(appointment.patient_id).get();

          // Filter appointments based on user role
          if (
            res.locals.user.uid === appointment.doctor_id ||
            res.locals.user.uid === appointment.patient_id
          ) {
            return {
              id: doc.id,
              ...appointment,
              doctor: doctorDoc.data(),
              patient: patientDoc.data(),
            };
          }
        })
      );
      // Filter out undefined values
      const filteredAppointments = appointments.filter((a) => a !== undefined);
      res.render('./appointment/appointments', {
        appointments: filteredAppointments,
      });
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
