import { Sequelize, DataTypes } from "sequelize";
import db from "../index.js";

const FriendRequest = db.define(
  "FriendRequest",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    receiverId: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    senderId: {
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

export default FriendRequest;
