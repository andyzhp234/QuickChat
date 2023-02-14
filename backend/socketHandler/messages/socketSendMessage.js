import socketBroadcastMessage from "./socketBroadcastMessage.js";
import {
  Message,
  Conversation,
  ConversationParticipant,
} from "../../db/models/index.js";

const socketSendMessage = async (socket, data) => {
  const { conversationId, content } = data;
  const userId = socket.request.session.userId;
  try {
    let isParticipant = await ConversationParticipant.findOne({
      where: {
        conversationId: conversationId,
        participantId: userId,
      },
    });

    if (!isParticipant) return;

    let conversationRoom = await Conversation.findOne({
      include: [
        {
          model: ConversationParticipant,
          as: "participant",
          required: true,
          attributes: ["participantId"],
        },
      ],
      where: { id: conversationId },
    });

    if (!conversationRoom) return;

    // now we found the chatRoom, we can create message that belongs to this chatroom
    const message = await Message.create({
      conversationId: conversationId,
      authorId: socket.request.session.userId,
      content: content,
      date: new Date(),
    });

    // broadcast this messages to all participants that is currently online
    await socketBroadcastMessage(conversationRoom.dataValues.participant, {
      id: message.dataValues.id,
      date: message.dataValues.date,
      content: message.dataValues.content,
      authorId: message.dataValues.authorId,
      authorName: socket.request.session.username,
      conversationId: message.dataValues.conversationId,
    });
  } catch (error) {
    console.log(error);
  }
};

export default socketSendMessage;
