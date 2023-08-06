"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Option, Decision}) {
      this.belongsTo(Option, {foreignKey: "optionId", as: "option"});
      this.belongsTo(Decision, {
        foreignKey: "priorityFieldId",
        as: "priorityField",
      });
      this.belongsTo(Decision, {
        foreignKey: "negativeFieldId",
        as: "negativeField",
      });
    }
  }

  Field.init(
    {
      name: DataTypes.STRING,
      optionId: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Field",
    }
  );

  return Field;
};
