import { RequestHandler } from 'express';

export const sendVerificationEmail: RequestHandler = async (req, res, next) => {
    
    return res
      .status(201)
      .json({ message: 'User successfully created', data: [] });
  };