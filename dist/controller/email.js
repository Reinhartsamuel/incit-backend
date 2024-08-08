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
exports.getUserAuth = exports.sendVerificationEmail = void 0;
const firebase_1 = __importDefault(require("../config/firebase"));
const sendVerificationEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res
        .status(201)
        .json({ message: 'User successfully created', data: [] });
});
exports.sendVerificationEmail = sendVerificationEmail;
const getUserAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    console.log('this is the uid:', uid);
    const userFirebaseAuth = yield firebase_1.default.auth().getUser(uid || '-abc-');
    return res
        .status(200)
        .json({
        message: 'User firebase successfully retrieved',
        data: userFirebaseAuth,
    });
});
exports.getUserAuth = getUserAuth;
