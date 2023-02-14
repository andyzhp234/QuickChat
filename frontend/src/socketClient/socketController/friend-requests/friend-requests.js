import { socket } from "../../socketConnection";

export const sendFriendRequest = (data, callback) => {
  if (socket) socket.emit("send-friend-request", data, callback);
};

export const acceptFriendRequest = (data, callback) => {
  if (socket) socket.emit("accept-friend-request", data, callback);
};

export const rejectFriendRequest = (data, callback) => {
  if (socket) socket.emit("reject-friend-request", data, callback);
};
