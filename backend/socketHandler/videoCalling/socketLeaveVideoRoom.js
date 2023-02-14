import { redisClient } from "../../server.js";
import { getSetMember } from "../socketUtils.js";
import { io } from "../../socketServer.js";

const socketLeaveVideoRoom = async (socket, data) => {
  const conversationId = data.conversationId;
  const userSocketId = socket.id;

  await redisClient.sRem(
    `videoConversationId:${conversationId}:socketIds`,
    userSocketId
  );

  // send this offer to all the participants of the current conversations
  const receiverSocket = await getSetMember(
    `videoConversationId:${conversationId}:socketIds`
  );
  for (let socketId of receiverSocket) {
    io.to(socketId).emit("user-leave", {});
  }
};

export default socketLeaveVideoRoom;
