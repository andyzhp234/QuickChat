import { io } from "../../socketServer.js";

const socketSendAnswer = async (socket, data) => {
  const targetSocketId = data.targetSocketId;
  const answer = data.answer;
  const userSocketId = socket.id;

  io.to(targetSocketId).emit("send-rtc-answer", {
    answer,
    senderSocketId: userSocketId,
  });
};

export default socketSendAnswer;
