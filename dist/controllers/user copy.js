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
const uuid_1 = require("uuid");
const schema_1 = require("../schema");
const { User } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside User Get * * *");
            const { uuid } = req.params;
            const user = yield User.findOne({
                where: {
                    uuid: { [Op.eq]: uuid },
                },
            }).catch((err) => {
                console.log("Error in User find one:", err);
                throw { response_code: 400, message: "Error in User find one" };
            });
            if (!user) {
                throw { response_code: 404, message: "User with that UUID not found" };
            }
            return res.send({ success: true, user });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
function create(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside User Create * * *");
            const valid = (0, schema_1.validateCreateUser)(req === null || req === void 0 ? void 0 : req.body);
            if (!valid) {
                throw { response_code: 400, message: "Invalid data object being passed" };
            }
            let dataObj = {
                email: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email,
                password: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password,
                uuid: (0, uuid_1.v4)(),
            };
            const existingUser = yield User.findOne({
                where: {
                    email: { [Op.eq]: dataObj === null || dataObj === void 0 ? void 0 : dataObj.email },
                },
            }).catch((err) => {
                console.log("Error in User create find existing:", err);
                throw { response_code: 400, message: "Error in User create find existing" };
            });
            if (existingUser) {
                throw {
                    response_code: 409,
                    message: "User with this email already exists",
                };
            }
            const createUser = yield User.create(dataObj).catch((err) => {
                console.log("Error in User create new:", err);
                throw { response_code: 400, message: "Error in User create new" };
            });
            return res.send({ success: true, user: createUser });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside User Update * * *");
            const valid = (0, schema_1.validateUpdateUser)(req === null || req === void 0 ? void 0 : req.body);
            if (!valid) {
                throw { response_code: 400, message: "Invalid data object being passed" };
            }
            const data = req === null || req === void 0 ? void 0 : req.body;
            const uuid = data === null || data === void 0 ? void 0 : data.uuid;
            data === null || data === void 0 ? true : delete data.uuid;
            const userExists = yield User.findOne({
                where: {
                    uuid: {
                        [Op.eq]: uuid,
                    },
                },
            }).catch((err) => {
                console.log("Error in User update find existing:", err);
                throw { response_code: 400, message: "Error in User update find existing" };
            });
            if (!userExists) {
                throw { response_code: 404, message: "User with that UUID not found" };
            }
            const updateUser = yield User.update(data, {
                where: {
                    uuid: {
                        [Op.eq]: uuid,
                    },
                },
            }).catch((err) => {
                console.log("Error in User update:", err);
                throw { response_code: 400, message: "Error in User update" };
            });
            return res.send({ success: true, message: "Successfully updated user" });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
exports.default = {
    get,
    create,
    update,
};
