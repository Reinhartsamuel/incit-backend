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
const axios_1 = __importDefault(require("axios"));
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
        const { token, email, name } = req.body;
        // const customToken = await adminFirebase.auth().createCustomToken(uid);
        // console.log(customToken, 'customToken');
        yield axios_1.default.post('https://byscript.io/api/email', {
            sender: {
                name: 'Auth App INCIT',
                email: 'noreply@incit.com',
            },
            to: [{ name, email }],
            subject: 'Verify Your INCIT Account',
            htmlContent: `<p>Hi, ${name},<br /> thank you for signing up on INCIT. Please click link below to verify your email address.</p><br />
        <a style='color:blue; text-decoration:underline; font-weight:bold; cursor:pointer' href="http://localhost:3000/users/verify-token/${token}">Verify Email</a>`,
        });
        return res
            .status(200)
            .json({ message: 'Custom token generated', data: token });
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
    var _a, _b;
    try {
        const { idToken } = req.params;
        // verify id token we get from the
        const decodedToken = yield firebase_1.default.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const customToken = yield firebase_1.default.auth().createCustomToken(uid);
        // console.log('the uid after decoded:', uid);
        // Based on firebase uid, get user and check if email is verified
        // if email is not verified, update email_verified to true
        const users = yield users_1.Users.findAll({
            where: { firebase_uid: uid },
        });
        if (users.length > 0) {
            if (((_a = users[0]) === null || _a === void 0 ? void 0 : _a.email_verified) === false) {
                yield users_1.Users.update({ email_verified: true }, {
                    where: { id: (_b = users[0]) === null || _b === void 0 ? void 0 : _b.id },
                });
            }
            else {
                return res.status(400).send('Link invalid');
            }
        }
        return res.redirect(302, `https://incit-assessment.web.app/login?token=${customToken}`);
    }
    catch (error) {
        return res.json({
            message: 'error',
            error: error.message,
        });
    }
});
exports.verifyCustomToken = verifyCustomToken;
