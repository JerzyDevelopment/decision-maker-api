import {Request, Response, NextFunction} from "express";
import {
  validateCreateDecision,
  validateDeleteDecision,
  validateGetAllDecision,
  validateUpdateDecision,
} from "../schema";
import {iCreateDecision, iUpdateDecision} from "../types";
import checkUserExists from "../utils/checkUserExists";

const {Decision} = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Decision Get All * * *");

    const valid = validateGetAllDecision(req?.body);

    if (!valid) {
      throw {response_code: 400, message: "Invalid data object being passed"};
    }

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

    const dataObj: iUpdateDecision = {...req?.body};

    const decisionId = dataObj?.id;

    delete dataObj?.id;
    delete dataObj?.userId;
    delete dataObj?.userUuid;

    const decisionExists = await Decision.findOne({
      where: {
        id: {[Op.eq]: decisionId},
      },
      raw: true,
    }).catch((err: any) => {
      console.log("Error in Option find one:", err);
      throw {response_code: 400, message: "Error in Option find one "};
    });

    if (!decisionExists) {
      throw {
        response_code: 404,
        message: "No decision found with that id",
      };
    }

    const updateDecision = await Decision.update(dataObj, {
      where: {
        id: {[Op.eq]: decisionExists.id},
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

async function deleteFunc(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside Decision Delete * * *");

    const valid = validateDeleteDecision(req?.body);

    if (!valid) {
      throw {response_code: 400, message: "Invalid data object being passed"};
    }

    const userExists = await checkUserExists("uuid", req?.body?.userUuid);

    if (!userExists?.success) {
      throw {response_code: 404, message: "User with that UUID not found"};
    }

    const correctUuid = userExists?.user?.uuid === req?.body?.userUuid;

    if (!correctUuid) {
      throw {
        response_code: 400,
        message:
          "passed userUuid does not match uuid on record for user with that id",
      };
    }

    const decision = await Decision.findOne({
      where: {
        id: {[Op.eq]: req?.body?.id},
      },
    }).catch((err: any) => {
      console.log("Error in Decision delete find one:", err);
      throw {response_code: 400, message: "Error in Decision delete find one"};
    });

    if (!decision) {
      throw {
        response_code: 400,
        message:
          "No Decision found with that id that belongs to provided user uuid",
      };
    }

    await decision?.destroy();

    return res.send({success: true, message: "Decision successfully deleted"});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

export default {
  getAll,
  create,
  update,
  deleteFunc,
};
