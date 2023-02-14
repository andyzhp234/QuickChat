import { DataTypes } from "sequelize";
import db from "../index.js";

const Message = db.define("Message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  conversationId: {
    type: DataTypes.UUID,
    references: {
      model: "Conversations",
      key: "id",
    },
    allowNull: false,
  },
  authorId: {
    type: DataTypes.UUID,
    references: {
      model: "Users",
      key: "id",
    },
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Message;
