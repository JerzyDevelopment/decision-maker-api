import {Request, Response, NextFunction} from "express";
import {v4 as uuidv4} from "uuid";
import {validateCreateUser} from "../schema";

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
      throw {response_code: 404, message: "User with the UUID not found"};
    }

    return res.send({success: true, user});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("* * * Inside User Create * * *");

    const uuid = uuidv4();

    const valid = validateCreateUser(req?.body);

    if (!valid) {
      throw {response_code: 400, message: "Invalid data being passed"};
    }

    const createUser = await User.create({...req?.body, uuid}).catch(
      (err: any) => {
        console.log("Error in User create:", err);
        throw {response_code: 400, message: "Error in User create"};
      }
    );

    return res.send({success: true, user: createUser});
  } catch (err: any) {
    return res.status(err.response_code).send(err);
  }
}

export default {
  get,
  create,
};
