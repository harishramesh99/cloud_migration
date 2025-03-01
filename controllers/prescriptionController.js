import Prescription from '../models/Prescription.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';

const prescriptionController = {
  registerPrescription: async (req, res) => {
    try {
      await Prescription.add(req.body);
      res.redirect('/prescriptions');
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
      res.redirect('/prescriptions');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  deletePrescription: async (req, res) => {
    try {
      await Prescription.delete(req.params.id);
      res.redirect('/prescriptions');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  listPrescriptions: async (req, res) => {
    try {
      const snapshot = await Prescription.get();
      const prescriptions = await Promise.all(
        snapshot.docs.map(async (doc) => {
          // console.log(res.locals.user); // Grab user from locals
          const prescription = doc.data();
          const doctorDoc = await Doctor.doc(prescription.doctor_id).get();
          const patientDoc = await Patient.doc(prescription.patient_id).get();

          // Filter prescriptions based on user role
          if (
            res.locals.user.uid === prescription.doctor_id ||
            res.locals.user.uid === prescription.patient_id
          ) {
            return {
              id: doc.id,
              ...prescription,
              doctor: doctorDoc.data(),
              patient: patientDoc.data(),
            };
          }
        })
      );
      // Filter out undefined values
      const filteredPrescriptions = prescriptions.filter(
        (p) => p !== undefined
      );
      res.render('./prescription/prescriptions', {
        prescriptions: filteredPrescriptions,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  renderRegisterPrescription: async (req, res) => {
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

    res.render('./prescription/registerPrescription', {
      patientList,
      doctorList,
    });
  },

  renderEditPrescription: async (req, res) => {
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

    const prescription = await Prescription.doc(req.params.id).get();
    res.render('./prescription/editPrescription', {
      prescription,
      patientList,
      doctorList,
    });
  },
};

export default prescriptionController;
