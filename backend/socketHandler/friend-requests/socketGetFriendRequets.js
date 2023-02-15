import { io } from "../../socketServer.js";
import { User, FriendRequest } from "../../db/models/index.js";

const socketGetFriendRequets = async (socket) => {
  try {
    const allRequests = await FriendRequest.findAll({
      include: [
        {
          model: User,
          as: "senderUser",
          attributes: ["username"],
        },
      ],
      where: { receiverId: socket.request.session.userId },
      attributes: ["id"],
    });

    io.to(socket.id).emit("friend-requests-list", {
      friendRequests: allRequests,
    });
  } catch (error) {
    console.log(error);
  }
};

export default socketGetFriendRequets;
