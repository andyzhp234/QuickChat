import express from "express";
import httpCheckAuth from "../middlewares/httpCheckAuth.js";
import {
  getChatHistory,
  getConversationParticipants,
} from "../controllers/messageController.js";
const router = express.Router();

router.get("/chat-history/:conversationId", httpCheckAuth, getChatHistory);
router.get(
  "/chat-participants/:conversationId",
  httpCheckAuth,
  getConversationParticipants
);

export default router;
