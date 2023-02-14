import User from "./User.js";
import Friend from "./Friend.js";
import FriendRequest from "./FriendRequest.js";
import Conversation from "./Conversation.js";
import ConversationParticipant from "./ConversationParticipant.js";
import Message from "./Message.js";

// associations

// friend.js
User.hasMany(Friend, { foreignKey: "user1_id", as: "user1" });
User.hasMany(Friend, { foreignKey: "user2_id", as: "user2" });
Friend.belongsTo(User, { foreignKey: "user1_id", as: "user1" });
Friend.belongsTo(User, { foreignKey: "user2_id", as: "user2" });

// messages.js
User.hasMany(Message, { foreignKey: "authorId", as: "author" });
Message.belongsTo(User, { foreignKey: "authorId", as: "author" });
Conversation.hasMany(Message, { foreignKey: "conversationId" });
Message.belongsTo(Conversation, { foreignKey: "conversationId" });

// FR.js
User.hasMany(FriendRequest, { foreignKey: "senderId", as: "senderUser" });
FriendRequest.belongsTo(User, {
  foreignKey: "senderId",
  as: "senderUser",
});
User.hasMany(FriendRequest, { foreignKey: "receiverId", as: "receiverUser" });
FriendRequest.belongsTo(User, {
  foreignKey: "receiverId",
  as: "receiverUser",
});

// CONVERSATION.js
Conversation.hasMany(ConversationParticipant, {
  foreignKey: "conversationId",
  as: "participant",
});
ConversationParticipant.belongsTo(Conversation, {
  foreignKey: "conversationId",
  as: "conversation",
});
User.hasMany(ConversationParticipant, {
  foreignKey: "participantId",
  as: "participant",
});
ConversationParticipant.belongsTo(User, {
  foreignKey: "participantId",
  as: "participant",
});

export {
  User,
  Friend,
  FriendRequest,
  Conversation,
  ConversationParticipant,
  Message,
};
