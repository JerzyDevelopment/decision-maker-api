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
                throw { response_code: 404, message: "User with the UUID not found" };
            }
            return res.send({ success: true, user });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside User Create * * *");
            const uuid = (0, uuid_1.v4)();
            const valid = (0, schema_1.validateCreateUser)(req === null || req === void 0 ? void 0 : req.body);
            if (!valid) {
                throw { response_code: 400, message: "Invalid data being passed" };
            }
            const createUser = yield User.create(Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { uuid })).catch((err) => {
                console.log("Error in User create:", err);
                throw { response_code: 400, message: "Error in User create" };
            });
            return res.send({ success: true, user: createUser });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
exports.default = {
    get,
    create,
};
