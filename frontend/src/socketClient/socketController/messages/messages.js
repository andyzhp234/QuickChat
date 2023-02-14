import { socket } from "../../socketConnection";

export const sendMessage = (data) => {
  if (socket) socket.emit("send-message", data);
};
