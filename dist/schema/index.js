"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateUser = exports.createUserScheme = void 0;
const ajv_instance_1 = __importDefault(require("./ajv-instance"));
exports.createUserScheme = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        // password: {type: "string", minLength: 8},
        password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object", // will not replace internal "type" error for the property "foo"
    },
    //optionalProperties: true
};
const validateCreateUser = ajv_instance_1.default.compile(exports.createUserScheme);
exports.validateCreateUser = validateCreateUser;
