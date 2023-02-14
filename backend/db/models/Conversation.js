import { Sequelize, DataTypes } from "sequelize";
import db from "../index.js";

const Conversation = db.define(
  "Conversation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: Sequelize.ENUM("direct", "group"),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);

export default Conversation;
