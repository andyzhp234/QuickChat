import { literal } from "sequelize";
import {
  User,
  Message,
  Conversation,
  ConversationParticipant,
} from "../db/models/index.js";

export const getChatHistory = async (req, res) => {
  const conversationId = req.params.conversationId;
  const userId = req.session.userId;
  try {
    // find the conversation Room with converstaionID
    // and use join to make sure the user is an participant of this conversation

    let conversationRoom = await Conversation.findOne({
      include: [
        {
          model: ConversationParticipant,
          as: "participant",
          required: true,
          where: {
            participantId: userId,
          },
          attributes: [],
        },
      ],
      where: { id: conversationId },
    });

    if (!conversationRoom) {
      return res.status(404).send({
        message: "Unable to find the conversations",
      });
    }
    // if we find all the old messages
    let messages = await Message.findAll({
      include: [
        {
          model: User,
          as: "author",
          required: true,
          attributes: ["username"],
        },
      ],
      where: { conversationId: conversationId },
      attributes: [
        "id",
        "content",
        "date",
        [
          literal(
            `CASE WHEN "authorId" = '${userId}' THEN true ELSE false END`
          ),
          "isSentByMe",
        ],
      ],
    });

    // intented to deliver to chatRoom with conversationId
    return res.status(200).json({ conversationId, messages });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to get chat history. Please try again later",
    });
  }
};

export const getConversationParticipants = async (req, res) => {
  const conversationId = req.params.conversationId;
  const userId = req.session.userId;
  try {
    // // find the conversation Room
    let conversationRoom = await Conversation.findOne({
      include: [
        {
          model: ConversationParticipant,
          as: "participant",
          required: true,
          where: {
            participantId: userId,
          },
          attributes: [],
        },
      ],
      where: { id: conversationId },
    });
    if (!conversationRoom) {
      return res.status(404).send({
        message: "Unable to find the conversations",
      });
    }

    let conversationParticipants = await ConversationParticipant.findAll({
      include: [
        {
          model: User,
          as: "participant",
          required: true,
          attributes: ["username"],
        },
      ],
      where: {
        conversationId,
      },
      attributes: [],
    });

    return res.status(200).json({ conversationId, conversationParticipants });
  } catch (error) {
    return res.status(400).send({
      message:
        "Unable to get Conversation Participants. Please try again later",
    });
  }
};
