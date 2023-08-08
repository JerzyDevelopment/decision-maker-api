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
const schema_1 = require("../schema");
const checkUserExists_1 = __importDefault(require("../utils/checkUserExists"));
const { Decision } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
function getAll(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside Decision Get All * * *");
            const { uuid } = req.params;
            const userExists = yield (0, checkUserExists_1.default)("uuid", uuid);
            if (!(userExists === null || userExists === void 0 ? void 0 : userExists.success)) {
                throw { response_code: 404, message: "User with that UUID not found" };
            }
            const decisions = yield Decision.findAll({
                where: {
                    userId: { [Op.eq]: (_a = userExists === null || userExists === void 0 ? void 0 : userExists.user) === null || _a === void 0 ? void 0 : _a.id },
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
    var _a, _b, _c, _d, _e, _f;
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
            const userExists = yield (0, checkUserExists_1.default)("id", decisionObj.userId);
            if (!(userExists === null || userExists === void 0 ? void 0 : userExists.success)) {
                throw {
                    response_code: 409,
                    message: "No user found with that id",
                };
            }
            const correctUuid = ((_c = userExists === null || userExists === void 0 ? void 0 : userExists.user) === null || _c === void 0 ? void 0 : _c.uuid) === ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.userUuid);
            if (!correctUuid) {
                throw {
                    response_code: 400,
                    message: "passed userUuid does not match uuid on record for user with that id",
                };
            }
            const existingDecision = yield Decision.findOne({
                where: {
                    userId: { [Op.eq]: decisionObj === null || decisionObj === void 0 ? void 0 : decisionObj.userId },
                    name: { [Op.eq]: decisionObj === null || decisionObj === void 0 ? void 0 : decisionObj.name },
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
            (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? true : delete _e.name;
            (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? true : delete _f.userId;
            const keysArr = Object.keys(req === null || req === void 0 ? void 0 : req.body);
            keysArr.map((key) => {
                decisionObj[key] = req === null || req === void 0 ? void 0 : req.body[key];
            });
            const createDecision = yield Decision.create(decisionObj).catch((err) => {
                console.log("Error in Decision create:", err);
                throw { response_code: 400, message: err };
            });
            return res.send({ success: true, decision: createDecision });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
function update(req, res, next) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside Decision Update * * *");
            const valid = (0, schema_1.validateUpdateDecision)(req === null || req === void 0 ? void 0 : req.body);
            if (!valid) {
                throw { response_code: 400, message: "Invalid data object being passed" };
            }
            const userExists = yield (0, checkUserExists_1.default)("id", (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId);
            if (!(userExists === null || userExists === void 0 ? void 0 : userExists.success)) {
                throw {
                    response_code: 409,
                    message: "No user found with that id",
                };
            }
            const correctUuid = ((_b = userExists === null || userExists === void 0 ? void 0 : userExists.user) === null || _b === void 0 ? void 0 : _b.uuid) === ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userUuid);
            if (!correctUuid) {
                throw {
                    response_code: 400,
                    message: "passed userUuid does not match uuid on record for user with that id",
                };
            }
            const dataObj = Object.assign({}, req === null || req === void 0 ? void 0 : req.body);
            const decisionId = dataObj === null || dataObj === void 0 ? void 0 : dataObj.id;
            dataObj === null || dataObj === void 0 ? true : delete dataObj.id;
            dataObj === null || dataObj === void 0 ? true : delete dataObj.userId;
            dataObj === null || dataObj === void 0 ? true : delete dataObj.userUuid;
            console.log(dataObj, "DATA OBJ");
            const updateDecision = yield Decision.update(dataObj, {
                where: {
                    id: { [Op.eq]: decisionId },
                },
            }).catch((err) => {
                console.log("Error in Decision update:", err);
                throw { response_code: 400, message: "Error in Decision update" };
            });
            return res.send({ success: true, message: "Successfully updated decision" });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
exports.default = {
    getAll,
    create,
    update,
};
