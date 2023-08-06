"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Field, Option}) {
      this.hasMany(Field, {foreignKey: "optionId", as: "Field"});
      this.belongsTo(Decision, {
        foreignKey: "selectedOptionId",
        as: "selectedOption",
      });
    }
  }
  Option.init(
    {
      name: DataTypes.STRING,
      decisionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Option",
    }
  );
  return Option;
};
