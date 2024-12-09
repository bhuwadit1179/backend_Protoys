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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.changeUserRole = exports.registerUser = void 0;
// src/services/userService.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userQueries_1 = require("../db/queries/userQueries");
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData, otherDetails = __rest(userData, ["email", "password"]);
    const existingUser = yield (0, userQueries_1.getUserByEmail)(email);
    if (existingUser)
        throw new Error('User already exists with this email.');
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    yield (0, userQueries_1.insertUser)(Object.assign(Object.assign({}, otherDetails), { email, password: hashedPassword }));
    return 'User registered successfully.';
});
exports.registerUser = registerUser;
const changeUserRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const VALID_ROLES = ['admin', 'company', 'user'];
    if (!VALID_ROLES.includes(role)) {
        throw new Error('Invalid role. Valid roles are: admin, company, user.');
    }
    yield (0, userQueries_1.updateUserRoleById)(userId, role);
    return 'User role updated successfully.';
});
exports.changeUserRole = changeUserRole;
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userQueries_1.getUserByEmail)(email);
    if (!user)
        return null;
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    return isPasswordValid ? user : null;
});
exports.authenticateUser = authenticateUser;
