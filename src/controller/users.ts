import { RequestHandler } from 'express';
import { Users } from '../models/users';

export const createUser: RequestHandler = async (req, res, next) => {
  const user = await Users.create({ ...req.body });
  return res
    .status(201)
    .json({ message: 'User successfully created', data: user });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const deleteUser: Users | null = await Users.findByPk(req.params.id);
  await Users.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res
    .status(200)
    .json({ message: 'User successfully deleted', data: deleteUser });
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const allUsers: Users[] = await Users.findAll();
  return res
    .status(200)
    .json({ messaeg: 'Users successfully retrieved', data: allUsers });
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const users: Users | null = await Users.findByPk(req.params.id);
  return res
    .status(200)
    .json({ message: 'User successfully retrieved', data: users });
};

export const updateUser: RequestHandler = async (req, res, next) => {
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
};
