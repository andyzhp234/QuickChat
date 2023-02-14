import { io } from "../../socketServer.js";
import { getSetMember } from "../socketUtils.js";

const socketSendCandidates = async (socket, data) => {
  const conversationId = data.conversationId;
  const candidate = data.candidate;
  const userSocketId = socket.id;

  // send this offer to all the participants of the current conversations
  const receiverSocket = await getSetMember(
    `videoConversationId:${conversationId}:socketIds`
  );
  for (let socketId of receiverSocket) {
    io.to(socketId).emit("send-ice-candidate", {
      candidate,
      senderSocketId: userSocketId,
    });
  }
};

export default socketSendCandidates;
