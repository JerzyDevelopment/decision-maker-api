import {Request, Response, NextFunction} from "express";
import {validateCreateOption, validateUpdateOption} from "../schema";
import checkUserExists from "../utils/checkUserExists";
const {Option, Decision} = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Option Get All * * *");

    const userExists = await checkUserExists("id", req?.body?.userId);

    if (!userExists?.success) {
      throw {response_code: 404, message: "User with that id not found"};
    }

    const correctUuid = userExists?.user?.uuid === req?.body?.userUuid;

    if (!correctUuid) {
      throw {
        response_code: 400,
        message:
          "passed userUuid does not match uuid on record for user with that id",
      };
    }

    const options = await Option.findAll({
      where: {
        decisionId: {[Op.eq]: req?.body?.decisionId},
      },
      raw: true,
    }).catch((err: any) => {
      console.log("Error in Option get all:", err);
      throw {response_code: 400, message: "Error in Option get all"};
    });

    if (!options) {
      throw {
        response_code: 400,
        message: "No options found for this decision for this user",
      };
    }

    return res.send({success: true, options: options});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Option Create * * *");

    const valid = validateCreateOption(req?.body);

    if (!valid) {
      throw {response_code: 400, message: "Invalid data object being passed"};
    }

    if (req?.body?.name?.length < 2) {
      throw {
        response_code: 400,
        message: "Option name must be at least 2 characters long",
      };
    }

    const userExists = await checkUserExists("id", req?.body?.userId);

    if (!userExists?.success) {
      throw {
        response_code: 404,
        message: "No user found with that id",
      };
    }

    const correctUuid = userExists?.user?.uuid === req?.body?.userUuid;

    if (!correctUuid) {
      throw {
        response_code: 400,
        message:
          "passed userUuid does not match uuid on record for user with that id",
      };
    }

    const existingOption = await Option.findOne({
      where: {
        name: {[Op.eq]: req?.body?.name},
        decisionId: {[Op.eq]: req?.body?.decisionId},
      },
    }).catch((err: any) => {
      console.log("Error in Option find one:", err);
      throw {response_code: 400, message: "Error in Option find one"};
    });

    if (existingOption) {
      throw {
        response_code: 409,
        message: "Option with this name already exists",
      };
    }

    const createOption = await Option.create(req?.body).catch((err: any) => {
      console.log("Error in Option create:", err);
      throw {response_code: 400, message: err};
    });
    return res.send({success: true, createdOption: createOption});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Option Update * * *");

    const valid = validateUpdateOption(req?.body);

    if (!valid) {
      throw {response_code: 400, message: "Invalid data object being passed"};
    }

    const userExists = await checkUserExists("id", req?.body?.userId);

    if (!userExists?.success) {
      throw {
        response_code: 404,
        message: "No user found with that id",
      };
    }

    const correctUuid = userExists?.user?.uuid === req?.body?.userUuid;

    if (!correctUuid) {
      throw {
        response_code: 400,
        message:
          "passed userUuid does not match uuid on record for user with that id",
      };
    }

    if (req?.body?.name?.length < 2) {
      throw {
        response_code: 400,
        message: "Option name must be at least 2 characters long",
      };
    }

    const optionExists = await Option.findOne({
      where: {
        id: {[Op.eq]: req?.body?.id},
      },
      raw: true,
    }).catch((err: any) => {
      console.log("Error in Option find one:", err);
      throw {response_code: 400, message: "Error in Option find one "};
    });

    if (!optionExists) {
      throw {
        response_code: 404,
        message: "No option found with that id",
      };
    }

    const updateOption = await Option.update(
      {name: req?.body?.name},
      {
        where: {
          id: {[Op.eq]: optionExists?.id},
        },
      }
    ).catch((err: any) => {
      console.log("Error in Option update:", err);
      throw {response_code: 400, message: "Error in Option update"};
    });

    return res.send({success: true, message: "Option successfully updated"});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

export default {
  getAll,
  create,
  update,
};
