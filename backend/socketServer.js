import { Server } from "socket.io";
import { socketDisconnectHandler } from "./socketHandler/disconnect.js";
import { socketConnectHandler } from "./socketHandler/connect.js";
import socketCheckAuth from "./middlewares/socketCheckAuth.js";
import socketAcceptFriendRequest from "./socketHandler/friend-requests/socketAcceptFriendRequest.js";
import socketSendFriendRequest from "./socketHandler/friend-requests/socketSendFriendRequest.js";
import socketRejectFriendRequest from "./socketHandler/friend-requests/socketRejectFriendRequest.js";
import socketSendMessage from "./socketHandler/messages/socketSendMessage.js";
import socketCreateGroup from "./socketHandler/groups/socketCreateGroup.js";
import socketJoinGroup from "./socketHandler/groups/socketJoinGroup.js";
import socketJoinVideoRoom from "./socketHandler/videoCalling/socketJoinVideoRoom.js";
import socketLeaveVideoRoom from "./socketHandler/videoCalling/socketLeaveVideoRoom.js";
import socketSendOffer from "./socketHandler/videoCalling/socketSendOffer.js";
import socketSendAnswer from "./socketHandler/videoCalling/socketSendAnswer.js";
import socketSendCandidates from "./socketHandler/videoCalling/socketSendCandidates.js";

let io;

// @params http Server
// @params reddis sessionMiddleware
const registerSocketServer = (server, sessionMiddleware) => {
  io = new Server(server, {
    cors: {
      origin: [
        // "http://127.0.0.1:5173",
        // "https://quickchat-app.netlify.app",
        "https://quick-chat.app",
      ],
      credentials: true,
    },
  });

  // convert a connect middleware to a Socket.IO middleware
  const wrap = (middleware) => {
    return (socket, next) => {
      middleware(socket.request, {}, next);
    };
  };

  io.use(wrap(sessionMiddleware));

  // Run the socketCheckAuth function before processing the request
  io.use((socket, next) => {
    socketCheckAuth(socket, (error) => {
      if (error) return next(error);
      next();
    });
  });

  io.on("connection", async (socket) => {
    socketConnectHandler(socket);
    socket.on("disconnect", async () => {
      socketDisconnectHandler(socket);
    });
    socket.on("send-message", (data) => {
      socketSendMessage(socket, data);
    });
    socket.on("send-friend-request", (data, callback) => {
      socketSendFriendRequest(socket, data, callback);
    });
    socket.on("accept-friend-request", (data, callback) => {
      socketAcceptFriendRequest(socket, data, callback);
    });
    socket.on("reject-friend-request", (data, callback) => {
      socketRejectFriendRequest(socket, data, callback);
    });
    socket.on("create-group-request", (data, callback) => {
      socketCreateGroup(socket, data, callback);
    });
    socket.on("join-group-request", (data, callback) => {
      socketJoinGroup(socket, data, callback);
    });
    socket.on("join-video-room", (data, callback) => {
      socketJoinVideoRoom(socket, data, callback);
    });
    socket.on("leave-video-room", (data) => {
      socketLeaveVideoRoom(socket, data);
    });
    socket.on("send-rtc-offer", (data) => {
      socketSendOffer(socket, data);
    });
    socket.on("send-rtc-answer", (data) => {
      socketSendAnswer(socket, data);
    });
    socket.on("send-ice-candidate", (data) => {
      socketSendCandidates(socket, data);
    });
  });
};

export default registerSocketServer;
export { io };
