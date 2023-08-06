"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Decision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Option, Field}) {
      this.hasMany(Option, {foreignKey: "decisionId", as: "options"});
      this.belongsTo(Option, {
        foreignKey: "selectedOptionId",
        as: "selectedOption",
      });
      this.belongsTo(Field, {
        foreignKey: "priorityFieldId",
        as: "priorityField",
      });
      this.belongsTo(Field, {
        foreignKey: "negativeFieldId",
        as: "negativeField",
      });
    }
  }

  Decision.init(
    {
      name: DataTypes.STRING,
      selectedOptionId: DataTypes.INTEGER,
      isDecided: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      priorityFieldId: DataTypes.INTEGER,
      negativeFieldId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Decision",
    }
  );

  return Decision;
};
