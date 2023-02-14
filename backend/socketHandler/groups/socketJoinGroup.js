import db from "../../db/index.js";
import Conversation from "../../db/models/Conversation.js";
import ConversationParticipant from "../../db/models/ConversationParticipant.js";
import { sendSocketMessageToUser } from "../socketUtils.js";

const socketJoinGroup = async (socket, data, callback) => {
  const conversationID = data.groupId;
  const userId = socket.request.session.userId;

  try {
    const chatRoom = await Conversation.findOne({
      where: { id: conversationID },
    });
    if (!chatRoom) {
      callback({
        error: true,
        message: "Unable to find the group",
      });
      return;
    }

    // check if we are already the participant
    const alreadyParticipant = await ConversationParticipant.findOne({
      conversationID: conversationID,
      participantId: userId,
    });
    if (alreadyParticipant) {
      callback({
        error: true,
        message: "You already joined this Group",
      });
      return;
    }

    // otherwise we can join the conversation
    await ConversationParticipant.create({
      conversationId: conversationID,
      participantId: userId,
    });

    await sendSocketMessageToUser(userId, "new-groups-chatroom", chatRoom);

    callback({
      message: `Successfully Joined Group Chatroom!`,
    });
  } catch (error) {
    callback({
      error: true,
      message: "Invalid Input. Please try again",
    });
  }
};

export default socketJoinGroup;
