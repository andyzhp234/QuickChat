import { redisClient } from "../../server.js";
import socketLeaveVideoRoom from "./socketLeaveVideoRoom.js";

const socketJoinVideoRoom = async (socket, data, callback) => {
  const conversationId = data.conversationId;
  const userSocketId = socket.id;

  // add the current user to video chatroom
  await redisClient.sAdd(
    `videoConversationId:${conversationId}:socketIds`,
    userSocketId
  );

  socket.on("disconnect", () => {
    socketLeaveVideoRoom(socket, {
      conversationId: conversationId,
    });
  });

  callback();
};

export default socketJoinVideoRoom;
