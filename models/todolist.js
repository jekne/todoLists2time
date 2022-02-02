"use strict";
const { Model } = require("sequelize");
const todoitem = require("./todoitem");
module.exports = (sequelize, DataTypes) => {
  class todoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      todoList.belongsTo(models.user);
      todoList.hasMany(models.todoItem);
      // define association here
    }
  }
  todoList.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "todoList",
    }
  );
  return todoList;
};
