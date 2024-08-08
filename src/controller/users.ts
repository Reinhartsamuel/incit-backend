import { RequestHandler } from 'express';
import { Users } from '../models/users';
import adminFirebase from '../config/firebase';

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
    const { uid } = req.body;
    const customToken = await adminFirebase.auth().createCustomToken(uid);
    console.log(customToken, 'customToken');
    return res
      .status(200)
      .json({ message: 'Custom token generated', data: customToken });
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
    const decodedToken = await adminFirebase.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    console.log('the uid after decoded:', uid);
    return res
      .status(200)
      .json({ message: 'Custom token verified', data: decodedToken });
  } catch (error: Error | any) {
    return res.json({
      message: 'error',
      error: error.message,
    });
  }
};
