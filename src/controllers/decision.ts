import {Request, Response, NextFunction} from "express";
import {validateCreateDecision, validateUpdateDecision} from "../schema";
import {iCreateDecision, iUpdateDecision} from "../types";
import checkUserExists from "../utils/checkUserExists";

const {Decision} = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Decision Get All * * *");

    const {uuid} = req.params;

    const userExists = await checkUserExists("uuid", uuid);

    if (!userExists?.success) {
      throw {response_code: 404, message: "User with that UUID not found"};
    }

    const decisions = await Decision.findAll({
      where: {
        userId: {[Op.eq]: userExists?.user?.id},
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

    const userExists = await checkUserExists("id", decisionObj.userId);

    if (!userExists?.success) {
      throw {
        response_code: 409,
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

    const existingDecision = await Decision.findOne({
      where: {
        userId: {[Op.eq]: decisionObj?.userId},
        name: {[Op.eq]: decisionObj?.name},
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
        throw {response_code: 400, message: err};
      }
    );

    return res.send({success: true, decision: createDecision});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Decision Update * * *");

    const valid = validateUpdateDecision(req?.body);

    if (!valid) {
      throw {response_code: 400, message: "Invalid data object being passed"};
    }

    const userExists = await checkUserExists("id", req?.body?.userId);

    if (!userExists?.success) {
      throw {
        response_code: 409,
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

    const dataObj: iUpdateDecision = {...req?.body};

    const decisionId = dataObj?.id;

    delete dataObj?.id;
    delete dataObj?.userId;
    delete dataObj?.userUuid;

    console.log(dataObj, "DATA OBJ");

    const updateDecision = await Decision.update(dataObj, {
      where: {
        id: {[Op.eq]: decisionId},
      },
    }).catch((err: any) => {
      console.log("Error in Decision update:", err);
      throw {response_code: 400, message: "Error in Decision update"};
    });

    return res.send({success: true, message: "Successfully updated decision"});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

export default {
  getAll,
  create,
  update,
};
