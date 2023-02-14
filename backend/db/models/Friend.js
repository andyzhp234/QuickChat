import { Sequelize, DataTypes } from "sequelize";
import db from "../index.js";

const Friend = db.define(
  "Friend",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user1_id: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    user2_id: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Friend;
