import {Request, Response, NextFunction} from "express";
import {v4 as uuidv4} from "uuid";
import {validateCreateUser, validateUpdateUser} from "../schema";
import {iUpdateUserObj, iUserObj} from "../types";
import checkUserExists from "../utils/checkUserExists";

const {User} = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside User Get * * *");

    const {uuid} = req.params;

    const userExists = await checkUserExists("uuid", uuid);

    if (!userExists?.success) {
      throw {response_code: 404, message: "User with that UUID not found"};
    }

    return res.send({success: true, user: userExists?.user});
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

    const userObj: iUserObj = {
      email: req?.body?.email,
      password: req?.body?.password,
      uuid: uuidv4(),
    };

    const userExists = await checkUserExists("email", userObj?.email);

    if (userExists?.success) {
      throw {
        response_code: 409,
        message: "User with this email already exists",
      };
    }

    const createUser = await User.create(userObj).catch((err: any) => {
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

    const data: iUpdateUserObj = req?.body;

    const uuid = data?.uuid;

    const userExists = await checkUserExists("uuid", uuid);

    if (!userExists?.success) {
      throw {response_code: 404, message: "User with that UUID not found"};
    }

    const updateUser = await User.update(data, {
      where: {
        id: {
          [Op.eq]: userExists?.user?.id,
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
