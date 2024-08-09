import { RequestHandler } from 'express';
import { Users } from '../models/users';
import adminFirebase from '../config/firebase';
import axios from 'axios';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await Users.create({ ...req.body });
    return res
      .status(201)
      .json({ message: 'User successfully created', data: user });
  } catch (error: Error | any) {
    return res.json({
      message: 'error',
      error: error.message,
    });
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const deleteUser: Users | null = await Users.findByPk(req.params.id);
    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res
      .status(200)
      .json({ message: 'User successfully deleted', data: deleteUser });
  } catch (error: Error | any) {
    return res.json({
      message: 'error',
      error: error.message,
    });
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const allUsers: Users[] = await Users.findAll();
    return res
      .status(200)
      .json({ messaeg: 'Users successfully retrieved', data: allUsers });
  } catch (error: Error | any) {
    return res.json({
      message: 'error',
      error: error.message,
    });
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const users: Users | null = await Users.findByPk(req.params.id);
    return res
      .status(200)
      .json({ message: 'Get user by ID successfully retrieved', data: users });
  } catch (error: Error | any) {
    return res.json({
      message: 'error',
      error: error.message,
    });
  }
};

export const getUserByQuery: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.query, 'this is the query');
    const users: Users[] | null = await Users.findAll({
      where: { ...req.query },
    });
    return res
      .status(200)
      .json({ message: 'Query user successfully retrieved', data: users });
  } catch (error: Error | any) {
    return res.json({
      message: 'error',
      error: error.message,
    });
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Users.update(
      { ...req.body },
      {
        where: { id },
      }
    );
    const updatedUsers: Users | null = await Users.findByPk(id);

    return res
      .status(200)
      .json({ message: 'User successfully updated', data: updatedUsers });
  } catch (error: Error | any) {
    return res.json({
      message: 'error',
      error: error.message,
    });
  }
};

export const generateCustomToken: RequestHandler = async (req, res, next) => {
  try {
    const { token, email, name } = req.body;
    // const customToken = await adminFirebase.auth().createCustomToken(uid);
    // console.log(customToken, 'customToken');

    await axios.post('https://byscript.io/api/email', {
      sender: {
        name: 'Auth App INCIT',
        email: 'noreply@incit.com',
      },
      to: [{ name, email }],
      subject: 'Verify Your INCIT Account',
      htmlContent: `<p>Hi, ${name},<br /> thank you for signing up on INCIT. Please click link below to verify your email address.</p><br />
        <a style='color:blue; text-decoration:underline; font-weight:bold; cursor:pointer' href="https://striking-illumination-production.up.railway.app/users/verify-token/${token}">Verify Email</a>`,
    });

    return res
      .status(200)
      .json({ message: 'Custom token generated', data: token });
  } catch (error: Error | any) {
    return res.json({
      message: 'error',
      error: error.message,
    });
  }
};

export const verifyCustomToken: RequestHandler = async (req, res, next) => {
  try {
    const { idToken } = req.params;

    // verify id token we get from the
    const decodedToken = await adminFirebase.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const customToken = await adminFirebase.auth().createCustomToken(uid);
    // console.log('the uid after decoded:', uid);

    // Based on firebase uid, get user and check if email is verified
    // if email is not verified, update email_verified to true
    const users: Users[] | null = await Users.findAll({
      where: { firebase_uid: uid },
    });
    if (users.length > 0) {
      if (users[0]?.email_verified === false) {
        await Users.update(
          { email_verified: true },
          {
            where: { id: users[0]?.id },
          }
        );
      } else {
        return res.status(400).send('Link invalid');
      }
    }
    return res.redirect(
      302,
      `https://incit-assessment.web.app/login?token=${customToken}`
    );
  } catch (error: Error | any) {
    return res.json({
      message: 'error',
      error: error.message,
    });
  }
};
