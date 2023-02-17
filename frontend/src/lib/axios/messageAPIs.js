import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `https://api.quick-chat.app`;

export async function getInitialChatHistory(conversationId) {
  return await axios.get(`/api/messages/chat-history/${conversationId}`);
}

export async function getMoreChatHistory(conversationId, topMessageTime) {
  // if we don't have the top message, then we don't fetch??
  if (!topMessageTime) return;
  return await axios.get(
    `/api/messages/chat-history/${conversationId}?topMessageTime=${topMessageTime}`
  );
}

export async function getConversationParticipants(conversationId) {
  return await axios.get(`/api/messages/chat-participants/${conversationId}`);
}
