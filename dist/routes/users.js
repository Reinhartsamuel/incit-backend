"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controller/users");
const router = (0, express_1.Router)();
router.get('/query', users_1.getUserByQuery);
router.get('/:id', users_1.getUserById);
router.post('/generate-token', users_1.generateCustomToken);
router.get('/verify-token/:idToken', users_1.verifyCustomToken);
router.post('/', users_1.createUser);
router.get('/', users_1.getAllUsers);
router.put('/:id', users_1.updateUser);
router.delete('/:id', users_1.deleteUser);
exports.default = router;
