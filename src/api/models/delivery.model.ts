import { DataTypes, Model } from "sequelize";
import User from "./user.model";
const sequelize = require("../../config/database");

class Delivery extends Model {}

Delivery.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM(
        "refused",
        "awaitingConfirmation",
        "confirmed",
        "preparing",
        "onRoute",
        "delivered"
      ),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "delivery",
    timestamps: true,
  }
);

Delivery.belongsTo(User);

export default Delivery;
