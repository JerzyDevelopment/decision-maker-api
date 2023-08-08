import ajvInstance from "./ajv-instance";

export const createUserScheme = {
  type: "object",
  properties: {
    email: {type: "string", format: "email"},
    password: {type: "string", minLength: 8},
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
  },
};
export const updateUserScheme = {
  type: "object",
  properties: {
    email: {type: "string", format: "email"},
    password: {type: "string", minLength: 8},
    uuid: {type: "string"},
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

export const createDecisionScheme = {
  type: "object",
  properties: {
    name: {type: "string"},
    selectedOptionId: {type: "integer"},
    isDecided: {type: "boolean"},
    userId: {type: "integer"},
    priorityFieldId: {type: "integer"},
    negativeFieldId: {type: "integer"},
    userUuid: {type: "string"},
  },
  required: ["name", "userId", "userUuid"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
  },
};
export const updateDecisionScheme = {
  type: "object",
  properties: {
    id: {type: "integer"},
    name: {type: "string"},
    selectedOptionId: {type: "integer"},
    isDecided: {type: "boolean"},
    userId: {type: "integer"},
    priorityFieldId: {type: "integer"},
    negativeFieldId: {type: "integer"},
    userUuid: {type: "string"},
  },
  required: ["id", "userId", "userUuid"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
  },
};

export const createOptionScheme = {
  type: "object",
  properties: {
    name: {type: "string"},
    decisionId: {type: "integer"},
  },
  required: ["name", "decisionId"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
  },
};
const validateCreateUser = ajvInstance.compile(createUserScheme);
const validateUpdateUser = ajvInstance.compile(updateUserScheme);
const validateCreateDecision = ajvInstance.compile(createDecisionScheme);
const validateUpdateDecision = ajvInstance.compile(updateDecisionScheme);
const validateCreateOption = ajvInstance.compile(createOptionScheme);

export {
  validateCreateUser,
  validateUpdateUser,
  validateCreateDecision,
  validateUpdateDecision,
  validateCreateOption,
};
