'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    username: { 
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.CHAR
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};