import { redisClient } from "../server.js";
import { io } from "../socketServer.js";
import socketGetFriends from "./friends/socketGetFriends.js";
import socketGetFriendRequets from "./friend-requests/socketGetFriendRequets.js";
import socketGetGroups from "./groups/socketGetGroups.js";

export const socketConnectHandler = async (socket) => {
  // save the socketID to the redis set and mark the current user to true in redis hash.
  await redisClient.hSet(
    `userid:${socket.request.session.userId}`,
    "isOnline",
    "true"
  );
  await redisClient.sAdd(
    `userid:${socket.request.session.userId}:socketIds`,
    socket.id
  );
  // send username to client
  io.to(socket.id).emit("get-username", {
    username: socket.request.session.username,
  });

  // fetch datas to client
  socketGetFriends(socket);
  socketGetFriendRequets(socket);
  socketGetGroups(socket);
};
