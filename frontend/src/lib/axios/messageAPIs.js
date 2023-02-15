import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = `https://quickchat-production.up.railway.app`;

export async function getChatHistory(conversationId) {
  return await axios.get(`/api/messages/chat-history/${conversationId}`);
}

export async function getConversationParticipants(conversationId) {
  return await axios.get(`/api/messages/chat-participants/${conversationId}`);
}
