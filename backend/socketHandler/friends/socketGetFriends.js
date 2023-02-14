import { Op, where, col, fn } from "sequelize";
import { io } from "../../socketServer.js";
import { checkHashIsOnline, getSetMember } from "../socketUtils.js";
import {
  User,
  Friend,
  Conversation,
  ConversationParticipant,
} from "../../db/models/index.js";

const socketGetFriends = async (socket) => {
  const userId = socket.request.session.userId;
  try {
    const allFriends = await Friend.findAll({
      include: [
        {
          model: User,
          as: "user1",
          attributes: ["id", "username"],
        },
        {
          model: User,
          as: "user2",
          attributes: ["id", "username"],
        },
      ],
      where: {
        [Op.or]: [{ user2_id: userId }, { user1_id: userId }],
      },
    });

    const onlineFriends = [];
    const offlineFriends = [];

    for (let friend of allFriends) {
      let friendId = friend.user1_id;
      let friendUsername = friend.user1.username;
      if (friendId === userId) {
        // friendID can't be the same userId with currect user
        friendId = friend.user2_id;
        friendUsername = friend.user2.username;
      }

      const conversationId = await Conversation.findAll({
        include: [
          {
            model: ConversationParticipant,
            as: "participant",
            required: true,
            where: {
              participantId: {
                [Op.in]: [userId, friendId],
              },
            },
            attributes: [],
          },
        ],
        where: {
          type: "direct",
        },
        group: ["Conversation.id"],
        having: [where(fn("COUNT", col("Conversation.id")), 2)],
        attributes: ["id"],
      });

      const friendInfos = {
        id: friendId,
        username: friendUsername,
        conversationId: conversationId[0].dataValues.id,
      };

      const friendIsOnline = await checkHashIsOnline(`userid:${friendId}`);
      if (friendIsOnline === "true") {
        onlineFriends.push(friendInfos);
        const friendSocketIds = await getSetMember(
          `userid:${friendId}:socketIds`
        );

        // notify all the friends that I am online now
        for (let socketId of friendSocketIds) {
          io.to(socketId).emit("friend-online", { friend: userId });
        }
      } else {
        offlineFriends.push(friendInfos);
      }
    }
    io.to(socket.id).emit("friend-list-online", { friends: onlineFriends });
    io.to(socket.id).emit("friend-list-offline", { friends: offlineFriends });
  } catch (error) {
    console.log("error when fetching friends: ", error);
  }
};

export default socketGetFriends;
