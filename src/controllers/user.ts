import {Request, Response, NextFunction} from "express";
import {v4 as uuidv4} from "uuid";
import {validateCreateUser, validateUpdateUser} from "../schema";

const {User} = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside User Get * * *");

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

    return res.send({success: true, user});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside User Create * * *");

    const valid = validateCreateUser(req?.body);

    if (!valid) {
      throw {response_code: 400, message: "Invalid data object being passed"};
    }

    let dataObj = {
      email: req?.body?.email,
      password: req?.body?.password,
      uuid: uuidv4(),
    };

    const existingUser = await User.findOne({
      where: {
        email: {[Op.eq]: dataObj?.email},
      },
    }).catch((err: any) => {
      console.log("Error in User create find existing:", err);
      throw {response_code: 400, message: "Error in User create find existing"};
    });

    if (existingUser) {
      throw {
        response_code: 409,
        message: "User with this email already exists",
      };
    }

    const createUser = await User.create(dataObj).catch((err: any) => {
      console.log("Error in User create new:", err);
      throw {response_code: 400, message: "Error in User create new"};
    });

    return res.send({success: true, user: createUser});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside User Update * * *");

    const valid = validateUpdateUser(req?.body);

    if (!valid) {
      throw {response_code: 400, message: "Invalid data object being passed"};
    }

    const data = req?.body;

    const uuid = data?.uuid;
    delete data?.uuid;

    const userExists = await User.findOne({
      where: {
        uuid: {
          [Op.eq]: uuid,
        },
      },
    }).catch((err: any) => {
      console.log("Error in User update find existing:", err);
      throw {response_code: 400, message: "Error in User update find existing"};
    });

    if (!userExists) {
      throw {response_code: 404, message: "User with that UUID not found"};
    }

    const updateUser = await User.update(data, {
      where: {
        uuid: {
          [Op.eq]: uuid,
        },
      },
    }).catch((err: any) => {
      console.log("Error in User update:", err);
      throw {response_code: 400, message: "Error in User update"};
    });

    return res.send({success: true, message: "Successfully updated user"});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

export default {
  get,
  create,
  update,
};
