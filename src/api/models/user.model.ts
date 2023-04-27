import { DataTypes, Model } from "sequelize";
const sequelize = require("../../config/database");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [1, 255],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.INTEGER,
      validate: {
        len: [10, 11],
      },
    },
  },
  { sequelize, modelName: "user", timestamps: true }
);

export default User;
