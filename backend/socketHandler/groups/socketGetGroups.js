import {
  Conversation,
  ConversationParticipant,
} from "../../db/models/index.js";
import { io } from "../../socketServer.js";

const socketGetGroups = async (socket) => {
  const userId = socket.request.session.userId;

  try {
    // we basically find all the conversation room that is group and belongs to this person.
    const allGroupConversation = await Conversation.findAll({
      include: [
        {
          model: ConversationParticipant,
          as: "participant",
          where: {
            participantId: userId,
          },
          attributes: [],
        },
      ],
      where: {
        type: "group",
      },
      attributes: ["id", "name", "type"],
    });
    io.to(socket.id).emit("groups-chatroom-list", allGroupConversation);
  } catch (error) {
    console.log(error);
  }
};

export default socketGetGroups;
