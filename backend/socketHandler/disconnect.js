import { redisClient } from "../server.js";
import { Op } from "sequelize";
import { io } from "../socketServer.js";
import { getSetSize, checkHashIsOnline, getSetMember } from "./socketUtils.js";
import { Friend } from "../db/models/index.js";

export const socketDisconnectHandler = async (socket) => {
  const userId = socket.request.session.userId;
  try {
    await redisClient.sRem(`userid:${userId}:socketIds`, socket.id);
    const setSize = await getSetSize(`userid:${userId}:socketIds`);
    if (!setSize || setSize <= 0) {
      await redisClient.del(`userid:${userId}`);
      // await redisClient.hSet(`userid:${userId}`, "isOnline", "false");
    }

    const allFriends = await Friend.findAll({
      where: {
        [Op.or]: [{ user2_id: userId }, { user1_id: userId }],
      },
    });

    const friendIds = [];
    for (let friend of allFriends) {
      const user1_id = friend.dataValues.user1_id;
      const user2_id = friend.dataValues.user2_id;
      if (user1_id === userId) {
        friendIds.push(user2_id);
      } else {
        friendIds.push(user1_id);
      }
    }

    // find all the online friend and emit them that I am logging out...
    for (let friendId of friendIds) {
      const friendIsOnline = await checkHashIsOnline(`userid:${friendId}`);
      if (friendIsOnline === "true") {
        const friendSocketIds = await getSetMember(
          `userid:${friendId}:socketIds`
        );
        for (let socketId of friendSocketIds) {
          io.to(socketId).emit("friend-offline", { friend: userId });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
