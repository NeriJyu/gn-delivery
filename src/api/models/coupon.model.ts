import { DataTypes, Model } from "sequelize";
const sequelize = require("../../config/database");

class Coupon extends Model {}

Coupon.init(
  {
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    percentage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxPrice: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "coupon", timestamps: true }
);

export default Coupon;
