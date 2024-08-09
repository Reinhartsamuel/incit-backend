"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countActiveSevenDaysSession = exports.countActiveTodaySessions = exports.countUsers = void 0;
const users_1 = require("../models/users");
const sequelize_1 = require("sequelize");
const today = new Date();
const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
const countUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countUsers = yield users_1.Users.count();
        return res
            .status(201)
            .json({ message: 'User successfully created', data: countUsers });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.countUsers = countUsers;
const countActiveTodaySessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countTodaySessions = yield users_1.Users.count({
            where: {
                last_login: {
                    [sequelize_1.Op.gte]: today.setHours(0, 0, 0, 0), // start of today
                    [sequelize_1.Op.lte]: today.setHours(23, 59, 59, 999), // end of today
                },
            },
        });
        return res
            .status(201)
            .json({ message: 'Count active sessions successfully retrieved', data: countTodaySessions });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.countActiveTodaySessions = countActiveTodaySessions;
const countActiveSevenDaysSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dailyCounts = yield Promise.all([
            users_1.Users.count({ where: { last_login: { [sequelize_1.Op.gte]: lastWeek, [sequelize_1.Op.lt]: new Date(lastWeek.getTime() + 24 * 60 * 60 * 1000) } } }),
            users_1.Users.count({ where: { last_login: { [sequelize_1.Op.gte]: new Date(lastWeek.getTime() + 24 * 60 * 60 * 1000), [sequelize_1.Op.lt]: new Date(lastWeek.getTime() + 2 * 24 * 60 * 60 * 1000) } } }),
            users_1.Users.count({ where: { last_login: { [sequelize_1.Op.gte]: new Date(lastWeek.getTime() + 2 * 24 * 60 * 60 * 1000), [sequelize_1.Op.lt]: new Date(lastWeek.getTime() + 3 * 24 * 60 * 60 * 1000) } } }),
            users_1.Users.count({ where: { last_login: { [sequelize_1.Op.gte]: new Date(lastWeek.getTime() + 3 * 24 * 60 * 60 * 1000), [sequelize_1.Op.lt]: new Date(lastWeek.getTime() + 4 * 24 * 60 * 60 * 1000) } } }),
            users_1.Users.count({ where: { last_login: { [sequelize_1.Op.gte]: new Date(lastWeek.getTime() + 4 * 24 * 60 * 60 * 1000), [sequelize_1.Op.lt]: new Date(lastWeek.getTime() + 5 * 24 * 60 * 60 * 1000) } } }),
            users_1.Users.count({ where: { last_login: { [sequelize_1.Op.gte]: new Date(lastWeek.getTime() + 5 * 24 * 60 * 60 * 1000), [sequelize_1.Op.lt]: new Date(lastWeek.getTime() + 6 * 24 * 60 * 60 * 1000) } } }),
            users_1.Users.count({ where: { last_login: { [sequelize_1.Op.gte]: new Date(lastWeek.getTime() + 6 * 24 * 60 * 60 * 1000), [sequelize_1.Op.lte]: today } } }),
        ]);
        const averageDailyCount = dailyCounts.reduce((acc, count) => acc + count, 0) / 7;
        return res
            .status(201)
            .json({ message: 'Average weekly', data: averageDailyCount });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.countActiveSevenDaysSession = countActiveSevenDaysSession;
