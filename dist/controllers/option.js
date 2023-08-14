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
const { Option, Decision } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
function getAll(req, res, next) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside Option Get All * * *");
            const userExists = yield (0, checkUserExists_1.default)("id", (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId);
            if (!(userExists === null || userExists === void 0 ? void 0 : userExists.success)) {
                throw { response_code: 404, message: "User with that id not found" };
            }
            const correctUuid = ((_b = userExists === null || userExists === void 0 ? void 0 : userExists.user) === null || _b === void 0 ? void 0 : _b.uuid) === ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userUuid);
            if (!correctUuid) {
                throw {
                    response_code: 400,
                    message: "passed userUuid does not match uuid on record for user with that id",
                };
            }
            const options = yield Option.findAll({
                where: {
                    decisionId: { [Op.eq]: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.decisionId },
                },
                raw: true,
            }).catch((err) => {
                console.log("Error in Option get all:", err);
                throw { response_code: 400, message: "Error in Option get all" };
            });
            if (!options) {
                throw {
                    response_code: 400,
                    message: "No options found for this decision for this user",
                };
            }
            return res.send({ success: true, options: options });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
function create(req, res, next) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside Option Create * * *");
            const valid = (0, schema_1.validateCreateOption)(req === null || req === void 0 ? void 0 : req.body);
            if (!valid) {
                throw { response_code: 400, message: "Invalid data object being passed" };
            }
            if (((_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.length) < 2) {
                throw {
                    response_code: 400,
                    message: "Option name must be at least 2 characters long",
                };
            }
            const userExists = yield (0, checkUserExists_1.default)("id", (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userId);
            if (!(userExists === null || userExists === void 0 ? void 0 : userExists.success)) {
                throw {
                    response_code: 404,
                    message: "No user found with that id",
                };
            }
            const correctUuid = ((_d = userExists === null || userExists === void 0 ? void 0 : userExists.user) === null || _d === void 0 ? void 0 : _d.uuid) === ((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.userUuid);
            if (!correctUuid) {
                throw {
                    response_code: 400,
                    message: "passed userUuid does not match uuid on record for user with that id",
                };
            }
            const existingOption = yield Option.findOne({
                where: {
                    name: { [Op.eq]: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.name },
                    decisionId: { [Op.eq]: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.decisionId },
                },
            }).catch((err) => {
                console.log("Error in Option find one:", err);
                throw { response_code: 400, message: "Error in Option find one" };
            });
            if (existingOption) {
                throw {
                    response_code: 409,
                    message: "Option with this name already exists",
                };
            }
            const createOption = yield Option.create(req === null || req === void 0 ? void 0 : req.body).catch((err) => {
                console.log("Error in Option create:", err);
                throw { response_code: 400, message: err };
            });
            return res.send({ success: true, createdOption: createOption });
        }
        catch (err) {
            return res.status(err.response_code).send(err);
        }
    });
}
function update(req, res, next) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("* * * Inside Option Update * * *");
            const valid = (0, schema_1.validateUpdateOption)(req === null || req === void 0 ? void 0 : req.body);
            if (!valid) {
                throw { response_code: 400, message: "Invalid data object being passed" };
            }
            const userExists = yield (0, checkUserExists_1.default)("id", (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId);
            if (!(userExists === null || userExists === void 0 ? void 0 : userExists.success)) {
                throw {
                    response_code: 404,
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
            if (((_e = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.name) === null || _e === void 0 ? void 0 : _e.length) < 2) {
                throw {
                    response_code: 400,
                    message: "Option name must be at least 2 characters long",
                };
            }
            const optionExists = yield Option.findOne({
                where: {
                    id: { [Op.eq]: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.id },
                },
                raw: true,
            }).catch((err) => {
                console.log("Error in Option find one:", err);
                throw { response_code: 400, message: "Error in Option find one " };
            });
            if (!optionExists) {
                throw {
                    response_code: 404,
                    message: "No option found with that id",
                };
            }
            const updateOption = yield Option.update({ name: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.name }, {
                where: {
                    id: { [Op.eq]: optionExists === null || optionExists === void 0 ? void 0 : optionExists.id },
                },
            }).catch((err) => {
                console.log("Error in Option update:", err);
                throw { response_code: 400, message: "Error in Option update" };
            });
            return res.send({ success: true, message: "Option successfully updated" });
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
