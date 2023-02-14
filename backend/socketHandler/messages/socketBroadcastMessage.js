import { io } from "../../socketServer.js";
import { getSetMember } from "../socketUtils.js";

const socketBroadcastMessage = async (participants, message) => {
  // O(n^2 Runtime)
  for (let participant of participants) {
    const participantId = participant.dataValues.participantId;

    const receiverSocket = await getSetMember(
      `userid:${participantId}:socketIds`
    );
    for (let socketId of receiverSocket) {
      io.to(socketId).emit("new-chat-message", {
        conversationId: message.conversationId,
        message: {
          id: message.id,
          content: message.content,
          isSentByMe: message.authorId === participantId,
          author: {
            username: message.authorName,
          },
          date: message.date,
        },
      });
    }
  }
};

export default socketBroadcastMessage;
