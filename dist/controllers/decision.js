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
const schema_1 = require("../schema");
const { User, Decision } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside Decision Get All * * *");
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
            const decisions = yield Decision.findAll({
                where: {
                    userId: { [Op.eq]: user.id },
                },
                raw: true,
            }).catch((err) => {
                console.log("Error in Decision get all:", err);
                throw { response_code: 400, message: "Error in Decision get all" };
            });
            return res.send({ success: true, decisions: decisions });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
function create(req, res, next) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside Decision Create * * *");
            const valid = (0, schema_1.validateCreateDecision)(req === null || req === void 0 ? void 0 : req.body);
            if (!valid) {
                throw { response_code: 400, message: "Invalid data object being passed" };
            }
            const decisionObj = {
                name: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.name,
                userId: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.userId,
            };
            const user = yield User.findOne({
                where: {
                    id: { [Op.eq]: decisionObj.userId },
                },
            }).catch((err) => {
                console.log("Error in Decision find one:", err);
                throw { response_code: 400, message: "Error in Decision find one" };
            });
            if (!user) {
                throw {
                    response_code: 409,
                    message: "No user found with that Id",
                };
            }
            const existingDecision = yield Decision.findOne({
                where: {
                    userId: { [Op.eq]: decisionObj.userId },
                    name: { [Op.eq]: decisionObj.name },
                },
            }).catch((err) => {
                console.log("Error in Decision find one:", err);
                throw { response_code: 400, message: "Error in Decision find one" };
            });
            if (existingDecision) {
                throw {
                    response_code: 409,
                    message: "Decision with this name already exists",
                };
            }
            (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? true : delete _c.name;
            (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? true : delete _d.userId;
            const keysArr = Object.keys(req === null || req === void 0 ? void 0 : req.body);
            keysArr.map((key) => {
                decisionObj[key] = req === null || req === void 0 ? void 0 : req.body[key];
            });
            const createDecision = yield Decision.create(decisionObj).catch((err) => {
                console.log("Error in Decision create:", err);
                throw { response_code: 400, message: "Error in Decision create" };
            });
            return res.send({ success: true, decision: createDecision });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
exports.default = {
    getAll,
    create,
};
