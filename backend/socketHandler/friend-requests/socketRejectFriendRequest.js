import { FriendRequest } from "../../db/models/index.js";

const socketRejectFriendRequest = async (socket, data, callback) => {
  try {
    const { id } = data;
    const friendRequestExist = await FriendRequest.findOne({
      where: { id: id },
    });

    if (friendRequestExist != null) {
      await FriendRequest.destroy({
        where: { id: id },
      });
    }

    callback({ succMessage: "Friend Rejected" });
  } catch (error) {
    callback({
      errMessage: "Unable to delete friend requests. Please try again later",
    });
  }
};

export default socketRejectFriendRequest;
