import { io } from "../../socketServer.js";
import { getSetMember } from "../socketUtils.js";

const socketSendOffer = async (socket, data) => {
  const conversationId = data.conversationId;
  const offer = data.offer;
  const userSocketId = socket.id;

  // send this offer to all the participants of the current conversations
  const receiverSocket = await getSetMember(
    `videoConversationId:${conversationId}:socketIds`
  );
  for (let socketId of receiverSocket) {
    io.to(socketId).emit("send-rtc-offer", {
      offer,
      senderSocketId: userSocketId,
    });
  }
};

export default socketSendOffer;
