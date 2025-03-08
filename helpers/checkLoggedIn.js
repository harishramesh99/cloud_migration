/** @format */

import { admin } from '../config/db.js';
import User from '../models/User.js';

const checkLoggedIn = async (sessionCookie) => {
  let response = {
    status: false,
    error: '',
    email: '',
    uid: '',
    role: 'guest',
  };

  if (sessionCookie != undefined) {
    await admin
      .auth()
      .verifySessionCookie(sessionCookie, true /** checkRevoked */)
      .then(async (userData) => {
        // console.log(userData);
        const user = await User.doc(userData.user_id).get();
        response.status = true;
        response.email = userData.email;
        response.uid = userData.uid;
        response.role = user.data().role;
      })
      .catch((error) => {
        response.error = error;
      });
  }

  return response;
};

export default checkLoggedIn;
