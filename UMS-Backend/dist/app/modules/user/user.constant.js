"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchAbleFields = exports.UserStatus = exports.USER_ROLE = void 0;
exports.USER_ROLE = {
    superAdmin: 'superAdmin',
    student: 'student',
    faculty: 'faculty',
    admin: 'admin',
};
exports.UserStatus = ['in-progress', 'blocked'];
exports.userSearchAbleFields = [
    'email',
    'name.firstName',
    'name.lastName',
    'presentAddress',
];
