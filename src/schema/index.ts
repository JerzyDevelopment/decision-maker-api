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

const validateCreateUser = ajvInstance.compile(createUserScheme);
const validateUpdateUser = ajvInstance.compile(updateUserScheme);

export {validateCreateUser, validateUpdateUser};
