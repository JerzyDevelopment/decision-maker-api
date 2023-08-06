"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateCreateUser = exports.updateUserScheme = exports.createUserScheme = void 0;
const ajv_instance_1 = __importDefault(require("./ajv-instance"));
exports.createUserScheme = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 8 },
    },
    required: ["email", "password"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
    },
};
exports.updateUserScheme = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 8 },
        uuid: { type: "string" },
    },
    required: ["uuid"],
    anyOf: [
        {
            required: ["email"],
        },
        {
            required: ["password"],
        },
    ],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
    },
};
const validateCreateUser = ajv_instance_1.default.compile(exports.createUserScheme);
exports.validateCreateUser = validateCreateUser;
const validateUpdateUser = ajv_instance_1.default.compile(exports.updateUserScheme);
exports.validateUpdateUser = validateUpdateUser;
