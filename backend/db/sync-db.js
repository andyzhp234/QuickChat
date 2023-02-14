import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import User from "./models/user.js";
import Friend from "./models/Friend.js";
import FriendRequest from "./models/FriendRequest.js";
import Conversation from "./models/Conversation.js";
import ConversationParticipant from "./models/ConversationParticipant.js";
import Message from "./models/Message.js";

dotenv.config();

const db = new Sequelize(process.env.PGCONNURL);

const sync = async () => {
  try {
    await User.sync({ force: true });
    await FriendRequest.sync({ force: true });
    await Conversation.sync({ force: true });
    await Message.sync({ force: true });
    await Friend.sync({ force: true });
    await ConversationParticipant.sync({ force: true });

    db.close();
    console.log("Database synced");
  } catch (error) {
    db.close();
    console.error(`Error syncing database: ${error.message}`);
    process.exit(1);
  }
};

sync();

export default sync;
