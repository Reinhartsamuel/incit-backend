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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCustomToken = exports.generateCustomToken = exports.updateUser = exports.getUserByQuery = exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.createUser = void 0;
const users_1 = require("../models/users");
const firebase_1 = __importDefault(require("../config/firebase"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.Users.create(Object.assign({}, req.body));
        return res
            .status(201)
            .json({ message: 'User successfully created', data: user });
    }
    catch (error) {
        return res.json({
            message: 'error',
            error: error.message,
        });
    }
});
exports.createUser = createUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUser = yield users_1.Users.findByPk(req.params.id);
        yield users_1.Users.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res
            .status(200)
            .json({ message: 'User successfully deleted', data: deleteUser });
    }
    catch (error) {
        return res.json({
            message: 'error',
            error: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield users_1.Users.findAll();
        return res
            .status(200)
            .json({ messaeg: 'Users successfully retrieved', data: allUsers });
    }
    catch (error) {
        return res.json({
            message: 'error',
            error: error.message,
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.Users.findByPk(req.params.id);
        return res
            .status(200)
            .json({ message: 'Get user by ID successfully retrieved', data: users });
    }
    catch (error) {
        return res.json({
            message: 'error',
            error: error.message,
        });
    }
});
exports.getUserById = getUserById;
const getUserByQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query, 'this is the query');
        const users = yield users_1.Users.findAll({
            where: Object.assign({}, req.query),
        });
        return res
            .status(200)
            .json({ message: 'Query user successfully retrieved', data: users });
    }
    catch (error) {
        return res.json({
            message: 'error',
            error: error.message,
        });
    }
});
exports.getUserByQuery = getUserByQuery;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield users_1.Users.update(Object.assign({}, req.body), {
            where: { id },
        });
        const updatedUsers = yield users_1.Users.findByPk(id);
        return res
            .status(200)
            .json({ message: 'User successfully updated', data: updatedUsers });
    }
    catch (error) {
        return res.json({
            message: 'error',
            error: error.message,
        });
    }
});
exports.updateUser = updateUser;
const generateCustomToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.body;
        const customToken = yield firebase_1.default.auth().createCustomToken(uid);
        console.log(customToken, 'customToken');
        return res
            .status(200)
            .json({ message: 'Custom token generated', data: customToken });
    }
    catch (error) {
        return res.json({
            message: 'error',
            error: error.message,
        });
    }
});
exports.generateCustomToken = generateCustomToken;
const verifyCustomToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idToken } = req.params;
        const decodedToken = yield firebase_1.default.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        console.log('the uid after decoded:', uid);
        return res
            .status(200)
            .json({ message: 'Custom token verified', data: decodedToken });
    }
    catch (error) {
        return res.json({
            message: 'error',
            error: error.message,
        });
    }
});
exports.verifyCustomToken = verifyCustomToken;
