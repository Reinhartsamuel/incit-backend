import { RequestHandler } from 'express';
import adminFirebase from '../config/firebase';
import { Users } from '../models/users';
import { Op } from 'sequelize';

const today = new Date();
const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

export const countUsers: RequestHandler = async (req, res) => {
  try {
    const countUsers = await Users.count();
    return res
      .status(201)
      .json({ message: 'User successfully created', data: countUsers });
  } catch (error: Error | any) {
    return res.status(500).json({ error: error.message });
  }
};

export const countActiveTodaySessions: RequestHandler = async (req, res) => {
  try {
    const countTodaySessions = await Users.count({
      where: {
        last_login: {
          [Op.gte]: today.setHours(0, 0, 0, 0), // start of today
          [Op.lte]: today.setHours(23, 59, 59, 999), // end of today
        },
      },
    });
    return res
      .status(201)
      .json({ message: 'Count active sessions successfully retrieved', data: countTodaySessions });
  } catch (error: Error | any) {
    return res.status(500).json({ error: error.message });
  }
};

export const countActiveSevenDaysSession: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const dailyCounts = await Promise.all([
      Users.count({ where: { last_login: { [Op.gte]: lastWeek, [Op.lt]: new Date(lastWeek.getTime() + 24 * 60 * 60 * 1000) } } }),
      Users.count({ where: { last_login: { [Op.gte]: new Date(lastWeek.getTime() + 24 * 60 * 60 * 1000), [Op.lt]: new Date(lastWeek.getTime() + 2 * 24 * 60 * 60 * 1000) } } }),
      Users.count({ where: { last_login: { [Op.gte]: new Date(lastWeek.getTime() + 2 * 24 * 60 * 60 * 1000), [Op.lt]: new Date(lastWeek.getTime() + 3 * 24 * 60 * 60 * 1000) } } }),
      Users.count({ where: { last_login: { [Op.gte]: new Date(lastWeek.getTime() + 3 * 24 * 60 * 60 * 1000), [Op.lt]: new Date(lastWeek.getTime() + 4 * 24 * 60 * 60 * 1000) } } }),
      Users.count({ where: { last_login: { [Op.gte]: new Date(lastWeek.getTime() + 4 * 24 * 60 * 60 * 1000), [Op.lt]: new Date(lastWeek.getTime() + 5 * 24 * 60 * 60 * 1000) } } }),
      Users.count({ where: { last_login: { [Op.gte]: new Date(lastWeek.getTime() + 5 * 24 * 60 * 60 * 1000), [Op.lt]: new Date(lastWeek.getTime() + 6 * 24 * 60 * 60 * 1000) } } }),
      Users.count({ where: { last_login: { [Op.gte]: new Date(lastWeek.getTime() + 6 * 24 * 60 * 60 * 1000), [Op.lte]: today } } }),
    ]);
    
    const averageDailyCount = dailyCounts.reduce((acc, count) => acc + count, 0) / 7;
    return res
      .status(201)
      .json({ message: 'Average weekly', data: averageDailyCount });
  } catch (error: Error | any) {
    return res.status(500).json({ error: error.message });
  }
};
