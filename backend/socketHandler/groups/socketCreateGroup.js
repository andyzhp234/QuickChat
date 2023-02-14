import db from "../../db/index.js";
import Conversation from "../../db/models/Conversation.js";
import ConversationParticipant from "../../db/models/ConversationParticipant.js";
import { sendSocketMessageToUser } from "../socketUtils.js";

const socketCreateGroup = async (socket, data, callback) => {
  const roomName = data.roomName;
  const transaction = await db.transaction();
  const userId = socket.request.session.userId;

  if (roomName.length < 4 || roomName.length > 13) {
    callback({
      error: true,
      message: "Room Name needs to have length 4 - 13",
    });
    return;
  }

  try {
    const conversationExists = await Conversation.findOne({
      where: {
        type: "group",
        name: roomName,
      },
    });
    if (conversationExists) {
      callback({
        error: true,
        message: "Group name already exists, please try another Group name",
      });
      return;
    }

    const chatRoom = await Conversation.create(
      {
        type: "group",
        name: roomName,
      },
      { transaction }
    );

    await ConversationParticipant.create(
      {
        conversationId: chatRoom.dataValues.id,
        participantId: userId,
      },
      { transaction }
    );

    await transaction.commit();

    await sendSocketMessageToUser(userId, "new-groups-chatroom", chatRoom);

    callback({
      message: `Successfully created Group Chatroom!`,
      groupIdMessage: chatRoom.dataValues.id,
    });
  } catch (error) {
    callback({
      error: true,
      message: "Unable to create Group. Please try again later",
    });
  }
};

export default socketCreateGroup;
