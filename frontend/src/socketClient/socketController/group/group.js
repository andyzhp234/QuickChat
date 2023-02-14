import { socket } from "../../socketConnection";

export const createGroupRequest = (data, callback) => {
  if (socket) socket.emit("create-group-request", data, callback);
};

export const joinGroupRequest = (data, callback) => {
  if (socket) socket.emit("join-group-request", data, callback);
};
