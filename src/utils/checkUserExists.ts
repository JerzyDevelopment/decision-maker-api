const {User} = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const checkUserExists = async (col: string, val: any) => {
  try {
    const whereCondition = {
      [col]: {[Op.eq]: val},
    };

    const user = await User.findOne({
      where: whereCondition,
    }).catch((err: any) => {
      console.log("Error in checkUserExists func");
      throw "Error in checkUserExists func";
    });

    return !user ? {success: false, user: null} : {success: true, user: user};
  } catch (err) {
    return {success: false, user: null};
  }
};

export default checkUserExists;
