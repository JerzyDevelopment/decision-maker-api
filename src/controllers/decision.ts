import {Request, Response, NextFunction} from "express";
import {validateCreateDecision} from "../schema";
import {iCreateDecision} from "../types";

const {User, Decision} = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Decision Get All * * *");

    const {uuid} = req.params;

    const user = await User.findOne({
      where: {
        uuid: {[Op.eq]: uuid},
      },
    }).catch((err: any) => {
      console.log("Error in User find one:", err);
      throw {response_code: 400, message: "Error in User find one"};
    });

    if (!user) {
      throw {response_code: 404, message: "User with that UUID not found"};
    }

    const decisions = await Decision.findAll({
      where: {
        userId: {[Op.eq]: user.id},
      },
      raw: true,
    }).catch((err: any) => {
      console.log("Error in Decision get all:", err);
      throw {response_code: 400, message: "Error in Decision get all"};
    });

    return res.send({success: true, decisions: decisions});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Decision Create * * *");

    const valid = validateCreateDecision(req?.body);

    if (!valid) {
      throw {response_code: 400, message: "Invalid data object being passed"};
    }

    const decisionObj: iCreateDecision = {
      name: req?.body?.name,
      userId: req?.body?.userId,
    };

    const user = await User.findOne({
      where: {
        id: {[Op.eq]: decisionObj.userId},
      },
    }).catch((err: any) => {
      console.log("Error in Decision find one:", err);
      throw {response_code: 400, message: "Error in Decision find one"};
    });

    if (!user) {
      throw {
        response_code: 409,
        message: "No user found with that Id",
      };
    }

    const existingDecision = await Decision.findOne({
      where: {
        userId: {[Op.eq]: decisionObj.userId},
        name: {[Op.eq]: decisionObj.name},
      },
    }).catch((err: any) => {
      console.log("Error in Decision find one:", err);
      throw {response_code: 400, message: "Error in Decision find one"};
    });

    if (existingDecision) {
      throw {
        response_code: 409,
        message: "Decision with this name already exists",
      };
    }

    delete req?.body?.name;
    delete req?.body?.userId;

    const keysArr = Object.keys(req?.body);

    keysArr.map((key: keyof iCreateDecision) => {
      decisionObj[key] = req?.body[key];
    });

    const createDecision = await Decision.create(decisionObj).catch(
      (err: any) => {
        console.log("Error in Decision create:", err);
        throw {response_code: 400, message: "Error in Decision create"};
      }
    );

    return res.send({success: true, decision: createDecision});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

export default {
  getAll,
  create,
};
