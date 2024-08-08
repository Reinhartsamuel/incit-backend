"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = require("../controller/email");
const router = (0, express_1.Router)();
router.post('/send-verification', email_1.sendVerificationEmail);
exports.default = router;
