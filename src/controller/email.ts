import { RequestHandler } from 'express';
import adminFirebase from '../config/firebase';

export const sendVerificationEmail: RequestHandler = async (req, res, next) => {
  return res
    .status(201)
    .json({ message: 'User successfully created', data: [] });
};

export const getUserAuth: RequestHandler = async (req, res, next) => {
  const { uid } = req.params;
  console.log('this is the uid:', uid);
  const userFirebaseAuth = await adminFirebase.auth().getUser(uid || '-abc-');
  return res
    .status(200)
    .json({
      message: 'User firebase successfully retrieved',
      data: userFirebaseAuth,
    });
};
