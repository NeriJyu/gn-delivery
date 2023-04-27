import { DataTypes, Model } from "sequelize";
const sequelize = require("../../config/database");

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      },
    },
    type: {
      type: DataTypes.ENUM("pizza", "dessert", "pastel", "acai", "drink"),
      allowNull: false,
    },
  },
  { sequelize, modelName: "product", timestamps: true }
);

export default Product;
