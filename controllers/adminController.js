import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

const getDashboardStats = async (req, res) => {
  try {
    const [patientsSnap, doctorsSnap, appointmentsSnap] = await Promise.all([
      Patient.get(),
      Doctor.get(),
      Appointment.get(),
    ]);

    const stats = {
      totalPatients: patientsSnap.size,
      totalDoctors: doctorsSnap.size,
      totalAppointments: appointmentsSnap.size,
      completedAppointments: appointmentsSnap.docs.filter(
        (doc) => doc.data().status === 'completed'
      ).length,
      upcomingAppointments: appointmentsSnap.docs.filter(
        (doc) => doc.data().status === 'scheduled'
      ).length,
    };

    res.render('adminDashboard', { stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default { getDashboardStats };
