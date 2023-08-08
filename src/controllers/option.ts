import {Request, Response, NextFunction} from "express";
import {validateCreateOption} from "../schema";
import checkUserExists from "../utils/checkUserExists";
const {Option, Decision} = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Option Get All * * *");

    const {uuid, decisionId} = req.params;

    const userExists = await checkUserExists("uuid", uuid);

    if (!userExists?.success) {
      throw {response_code: 404, message: "User with that UUID not found"};
    }

    const decisions = await Decision.findAll({
      where: {
        userId: {[Op.eq]: userExists.user.id},
      },
      attributes: ["id"],
      raw: true,
    });

    let correctId = false;

    decisions.map((el: {id: number}) => {
      if (el.id.toString() === decisionId) {
        correctId = true;
      }
    });

    if (!correctId) {
      throw {
        response_code: 404,
        message: "User does not have any decisions with provided id",
      };
    }

    const options = await Option.findAll({
      where: {
        decisionId: {[Op.eq]: decisionId},
      },
      raw: true,
    }).catch((err: any) => {
      console.log("Error in Option get all:", err);
      throw {response_code: 400, message: "Error in Option get all"};
    });

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

export default {
  getAll,
  create,
};
