import ajvInstance from "./ajv-instance";

export const createUserScheme = {
  type: "object",
  properties: {
    email: {type: "string", format: "email"},
    // password: {type: "string", minLength: 8},
    password: {type: "string"},
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object", // will not replace internal "type" error for the property "foo"
  },
  //optionalProperties: true
};

const validateCreateUser = ajvInstance.compile(createUserScheme);

export {validateCreateUser};
