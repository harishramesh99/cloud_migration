import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/db.js';

const trackUserSession = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      callback(user);
    } else {
      // User is signed out
      callback(null);
    }
  });
};

export { trackUserSession };
