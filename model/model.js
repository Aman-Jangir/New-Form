const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("newTable",
      {Name:{type: DataTypes.STRING, allowNull: false} ,
      Number: {type: DataTypes.INTEGER, allowNull: false}},
      { timestamps: false }
      );
    return user;
  };