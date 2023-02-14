import socketNotifyNewFriend from "./socketNotifyNewFriend.js";
import db from "../../db/index.js";
import {
  User,
  Friend,
  FriendRequest,
  Conversation,
  ConversationParticipant,
} from "../../db/models/index.js";

const socketAcceptFriendRequest = async (socket, data, callback) => {
  const transaction = await db.transaction();
  try {
    const { id } = data;
    const friendRequestExist = await FriendRequest.findOne({
      include: [
        {
          model: User,
          as: "senderUser",
          attributes: ["id", "username"],
        },
        {
          model: User,
          as: "receiverUser",
          attributes: ["id", "username"],
        },
      ],
      where: { id: id },
    });

    if (friendRequestExist == null) return;

    await Friend.create(
      {
        user1_id: friendRequestExist.senderId,
        user2_id: friendRequestExist.receiverId,
      },
      { transaction }
    );

    // when a user accept a friend request, we should
    // create a direct chatroom for the sender and the receiver
    const dmChatRoom = await Conversation.create(
      { type: "direct" },
      { transaction }
    );

    await ConversationParticipant.create(
      {
        conversationId: dmChatRoom.dataValues.id,
        participantId: friendRequestExist.senderId,
      },
      { transaction }
    );

    await ConversationParticipant.create(
      {
        conversationId: dmChatRoom.dataValues.id,
        participantId: friendRequestExist.receiverId,
      },
      { transaction }
    );

    // notify both sender and receiver we have a new friend
    await socketNotifyNewFriend(
      friendRequestExist.senderUser,
      friendRequestExist.receiverUser,
      dmChatRoom.dataValues.id
    );

    await socketNotifyNewFriend(
      friendRequestExist.receiverUser,
      friendRequestExist.senderUser,
      dmChatRoom.dataValues.id
    );

    await FriendRequest.destroy({ where: { id: id } }, { transaction });
    await transaction.commit();
    callback({ succMessage: "Friend Accepted" });
  } catch (error) {
    await transaction.rollback();
    callback({
      errMessage: "Unable to delete friend requests. Please try again later",
    });
  }
};

export default socketAcceptFriendRequest;
