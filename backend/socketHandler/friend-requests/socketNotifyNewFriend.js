import { io } from "../../socketServer.js";
import { getSetMember, checkHashIsOnline } from "../socketUtils.js";

const socketNotifyNewFriend = async (receiver, sender, conversationId) => {
  // real time notification of both user
  const senderIsOnline = await checkHashIsOnline(`userid:${sender.id}`);
  const receiverIsOnline = await checkHashIsOnline(`userid:${receiver.id}`);

  // if receiver is not even online, then no socket we can send
  if (receiverIsOnline === "false") {
    return;
  }

  const friendInfo = {
    id: sender.id,
    username: sender.username,
    conversationId: conversationId,
  };

  const receiverSocket = await getSetMember(`userid:${receiver.id}:socketIds`);
  for (let socketId of receiverSocket) {
    if (senderIsOnline === "true") {
      io.to(socketId).emit("new-friend-online", { friend: friendInfo });
    } else {
      io.to(socketId).emit("new-friend-offline", { friend: friendInfo });
    }
  }
};

export default socketNotifyNewFriend;
