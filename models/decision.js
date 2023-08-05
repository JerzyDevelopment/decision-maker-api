'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Decision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Option}) {
      this.hasMany(Option, { foreignKey: "decisionId", as: "Option" })

    }
  }
  Decision.init({
    name: DataTypes.STRING,
    selectedOptionId: DataTypes.INTEGER,
    isDecided: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    priorityFieldId: DataTypes.INTEGER,
    negativeFieldId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Decision',
  });
  return Decision;
};