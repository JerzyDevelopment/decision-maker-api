"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateOption = exports.validateUpdateDecision = exports.validateCreateDecision = exports.validateUpdateUser = exports.validateCreateUser = exports.createOptionScheme = exports.updateDecisionScheme = exports.createDecisionScheme = exports.updateUserScheme = exports.createUserScheme = void 0;
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
exports.createDecisionScheme = {
    type: "object",
    properties: {
        name: { type: "string" },
        selectedOptionId: { type: "integer" },
        isDecided: { type: "boolean" },
        userId: { type: "integer" },
        priorityFieldId: { type: "integer" },
        negativeFieldId: { type: "integer" },
        userUuid: { type: "string" },
    },
    required: ["name", "userId", "userUuid"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
    },
};
exports.updateDecisionScheme = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
        selectedOptionId: { type: "integer" },
        isDecided: { type: "boolean" },
        userId: { type: "integer" },
        priorityFieldId: { type: "integer" },
        negativeFieldId: { type: "integer" },
        userUuid: { type: "string" },
    },
    required: ["id", "userId", "userUuid"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
    },
};
exports.createOptionScheme = {
    type: "object",
    properties: {
        name: { type: "string" },
        decisionId: { type: "integer" },
    },
    required: ["name", "decisionId"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
    },
};
const validateCreateUser = ajv_instance_1.default.compile(exports.createUserScheme);
exports.validateCreateUser = validateCreateUser;
const validateUpdateUser = ajv_instance_1.default.compile(exports.updateUserScheme);
exports.validateUpdateUser = validateUpdateUser;
const validateCreateDecision = ajv_instance_1.default.compile(exports.createDecisionScheme);
exports.validateCreateDecision = validateCreateDecision;
const validateUpdateDecision = ajv_instance_1.default.compile(exports.updateDecisionScheme);
exports.validateUpdateDecision = validateUpdateDecision;
const validateCreateOption = ajv_instance_1.default.compile(exports.createOptionScheme);
exports.validateCreateOption = validateCreateOption;
