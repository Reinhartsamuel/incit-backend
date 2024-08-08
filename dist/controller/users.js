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
exports.updateUser = exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.createUser = void 0;
const users_1 = require("../models/users");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.Users.create(Object.assign({}, req.body));
    return res
        .status(201)
        .json({ message: 'User successfully created', data: user });
});
exports.createUser = createUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield users_1.Users.findByPk(req.params.id);
    yield users_1.Users.destroy({
        where: {
            id: req.params.id,
        },
    });
    return res
        .status(200)
        .json({ message: 'User successfully deleted', data: deleteUser });
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield users_1.Users.findAll();
    return res
        .status(200)
        .json({ messaeg: 'Users successfully retrieved', data: allUsers });
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_1.Users.findByPk(req.params.id);
    return res
        .status(200)
        .json({ message: 'User successfully retrieved', data: users });
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield users_1.Users.update(Object.assign({}, req.body), {
        where: { id },
    });
    const updatedUsers = yield users_1.Users.findByPk(id);
    return res
        .status(200)
        .json({ message: 'User successfully updated', data: updatedUsers });
});
exports.updateUser = updateUser;
