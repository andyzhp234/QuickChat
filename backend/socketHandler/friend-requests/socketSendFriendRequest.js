import { Op } from "sequelize";
import { io } from "../../socketServer.js";
import { getSetMember } from "../socketUtils.js";
import { User, FriendRequest, Friend } from "../../db/models/index.js";

const socketSendFriendRequest = async (socket, data, callback) => {
  const receiverEmail = data.email.toLowerCase();
  const senderEmail = socket.request.session.userEmail.toLowerCase();

  try {
    // can not send friend request to yourself
    if (senderEmail === receiverEmail) {
      callback({
        message: "Can't send friend request to yourself",
        error: true,
      });
      return;
    }

    // check if receiver email is an valid registered user
    const receiverUser = await User.findOne({
      where: { email: receiverEmail },
    });

    // if receiver don't exists
    if (receiverUser == null) {
      callback({
        message: "No account found associated with this email.",
        error: true,
      });
      return;
    }

    const senderId = socket.request.session.userId;
    const receiverId = receiverUser.dataValues.id;

    // check if the user already send such request
    const requestExists = await FriendRequest.findOne({
      where: { receiverId: receiverId, senderId: senderId },
    });

    // if this requests already exists
    if (requestExists != null) {
      callback({
        message: "You already sent the friend requests",
        error: true,
      });
      return;
    }

    // check if he is already our friend
    const checkIsFriend = await Friend.findOne({
      where: {
        [Op.or]: [
          { user1_id: receiverId, user2_id: senderId },
          { user1_id: senderId, user2_id: receiverId },
        ],
      },
    });

    // if this requests already exists
    if (checkIsFriend != null) {
      callback({
        message: "You already added this user",
        error: true,
      });
      return;
    }

    // we can create this requests in DB and send it to the client over the socket.
    const data = await FriendRequest.create({
      senderId: senderId,
      receiverId: receiverId,
    });

    // format the response data
    const responseFriendRequest = {
      id: data.dataValues.id,
      senderUser: {
        username: socket.request.session.username,
      },
    };

    const receiverSockets = await getSetMember(
      `userid:${receiverId}:socketIds`
    );

    for (let socketId of receiverSockets) {
      io.to(socketId).emit("friend-request", {
        friendRequest: responseFriendRequest,
      });
    }

    callback({
      message: "Invitation has been sent!",
      error: false,
    });
  } catch (error) {
    callback({
      message: "Unable to send friend request. Please try again later",
      error: true,
    });
  }
};

export default socketSendFriendRequest;
