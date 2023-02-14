import { socket } from "../../socketConnection";

export const socketDisconnect = () => {
  if (socket) socket.disconnect();
};
