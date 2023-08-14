"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateOption = exports.validateCreateOption = exports.validateGetAllOption = exports.validateDeleteDecision = exports.validateUpdateDecision = exports.validateCreateDecision = exports.validateGetAllDecision = exports.validateDeleteUser = exports.validateUpdateUser = exports.validateCreateUser = exports.updateOptionScheme = exports.createOptionScheme = exports.getAllOptionScheme = exports.deleteDecisionScheme = exports.updateDecisionScheme = exports.createDecisionScheme = exports.getAllDecisionScheme = exports.deleteUserScheme = exports.updateUserScheme = exports.createUserScheme = void 0;
const ajv_instance_1 = __importDefault(require("./ajv-instance"));
//USER
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
        id: { type: "integer" },
    },
    required: ["id"],
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
exports.deleteUserScheme = {
    type: "object",
    properties: {
        uuid: { type: "string" },
        id: { type: "integer" },
    },
    required: ["uuid", "id"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
    },
};
const validateCreateUser = ajv_instance_1.default.compile(exports.createUserScheme);
exports.validateCreateUser = validateCreateUser;
const validateUpdateUser = ajv_instance_1.default.compile(exports.updateUserScheme);
exports.validateUpdateUser = validateUpdateUser;
const validateDeleteUser = ajv_instance_1.default.compile(exports.deleteUserScheme);
exports.validateDeleteUser = validateDeleteUser;
//DECISION
exports.getAllDecisionScheme = {
    type: "object",
    properties: {
        userId: { type: "integer" },
        userUuid: { type: "string" },
    },
    required: ["userId", "userUuid"],
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
exports.deleteDecisionScheme = {
    type: "object",
    properties: {
        userUuid: { type: "string" },
        userId: { type: "integer" },
        id: { type: "integer" },
    },
    required: ["userUuid", "userId", "id"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
    },
};
const validateGetAllDecision = ajv_instance_1.default.compile(exports.getAllDecisionScheme);
exports.validateGetAllDecision = validateGetAllDecision;
const validateCreateDecision = ajv_instance_1.default.compile(exports.createDecisionScheme);
exports.validateCreateDecision = validateCreateDecision;
const validateUpdateDecision = ajv_instance_1.default.compile(exports.updateDecisionScheme);
exports.validateUpdateDecision = validateUpdateDecision;
const validateDeleteDecision = ajv_instance_1.default.compile(exports.deleteDecisionScheme);
exports.validateDeleteDecision = validateDeleteDecision;
//OPTION
exports.getAllOptionScheme = {
    type: "object",
    properties: {
        decisionId: { type: "integer" },
        userId: { type: "integer" },
        userUuid: { type: "string" },
    },
    required: ["decisionId", "userUuid", "userId"],
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
        userId: { type: "integer" },
        userUuid: { type: "string" },
    },
    required: ["name", "decisionId", "userId", "userUuid"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
    },
};
exports.updateOptionScheme = {
    type: "object",
    properties: {
        name: { type: "string" },
        decisionId: { type: "integer" },
        userId: { type: "integer" },
        userUuid: { type: "string" },
        id: { type: "integer" },
    },
    required: ["name", "decisionId", "userId", "userUuid", "id"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
    },
};
const validateGetAllOption = ajv_instance_1.default.compile(exports.getAllOptionScheme);
exports.validateGetAllOption = validateGetAllOption;
const validateCreateOption = ajv_instance_1.default.compile(exports.createOptionScheme);
exports.validateCreateOption = validateCreateOption;
const validateUpdateOption = ajv_instance_1.default.compile(exports.updateOptionScheme);
exports.validateUpdateOption = validateUpdateOption;
