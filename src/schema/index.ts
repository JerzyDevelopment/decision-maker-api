import ajvInstance from "./ajv-instance";
//USER
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
    id: {type: "integer"},
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
export const deleteUserScheme = {
  type: "object",
  properties: {
    uuid: {type: "string"},
    id: {type: "integer"},
  },
  required: ["uuid", "id"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
  },
};
const validateCreateUser = ajvInstance.compile(createUserScheme);
const validateUpdateUser = ajvInstance.compile(updateUserScheme);
const validateDeleteUser = ajvInstance.compile(deleteUserScheme);

//DECISION
export const getAllDecisionScheme = {
  type: "object",
  properties: {
    userId: {type: "integer"},
    userUuid: {type: "string"},
  },
  required: ["userId", "userUuid"],
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
export const deleteDecisionScheme = {
  type: "object",
  properties: {
    userUuid: {type: "string"},
    userId: {type: "integer"},
    id: {type: "integer"},
  },
  required: ["userUuid", "userId", "id"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
  },
};
const validateGetAllDecision = ajvInstance.compile(getAllDecisionScheme);
const validateCreateDecision = ajvInstance.compile(createDecisionScheme);
const validateUpdateDecision = ajvInstance.compile(updateDecisionScheme);
const validateDeleteDecision = ajvInstance.compile(deleteDecisionScheme);

//OPTION
export const getAllOptionScheme = {
  type: "object",
  properties: {
    decisionId: {type: "integer"},
    userId: {type: "integer"},
    userUuid: {type: "string"},
  },
  required: ["decisionId", "userUuid", "userId"],
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
    userId: {type: "integer"},
    userUuid: {type: "string"},
  },
  required: ["name", "decisionId", "userId", "userUuid"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
  },
};
export const updateOptionScheme = {
  type: "object",
  properties: {
    name: {type: "string"},
    decisionId: {type: "integer"},
    userId: {type: "integer"},
    userUuid: {type: "string"},
    id: {type: "integer"},
  },
  required: ["name", "decisionId", "userId", "userUuid", "id"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
  },
};
const validateGetAllOption = ajvInstance.compile(getAllOptionScheme);
const validateCreateOption = ajvInstance.compile(createOptionScheme);
const validateUpdateOption = ajvInstance.compile(updateOptionScheme);

export {
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
  validateGetAllDecision,
  validateCreateDecision,
  validateUpdateDecision,
  validateDeleteDecision,
  validateGetAllOption,
  validateCreateOption,
  validateUpdateOption,
};
