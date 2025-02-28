import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../config/db.js';

const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // User is signed in
    console.log(result.user);
  } catch (error) {
    console.error(error);
  }
};

const googleLogout = async () => {
  try {
    await signOut(auth);
    // User is signed out
    console.log('User signed out');
  } catch (error) {
    console.error(error);
  }
};

export { googleLogin, googleLogout };
