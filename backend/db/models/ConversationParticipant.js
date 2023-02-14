import { DataTypes } from "sequelize";
import db from "../index.js";

const ConversationParticipant = db.define(
  "ConversationParticipant",
  {
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
    participantId: {
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

export default ConversationParticipant;
