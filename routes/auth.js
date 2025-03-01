import express from 'express';
import { admin } from '../config/db.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/sessionLogin', async (req, res) => {
  const idToken = req.body.idToken.toString();
  const uid = req.body.uid.toString();
  const user = await User.doc(uid).get();

  const expiresIn = 60 * 60 * 24 * 7 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success', user: user.data() }));
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      }
    );
});

router.get('/sessionLogout', (req, res) => {
  res.clearCookie('session');
  res.redirect('/');
});

export default router;
