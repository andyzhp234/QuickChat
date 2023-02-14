import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = `http://localhost:3000`;

export async function getChatHistory(conversationId) {
  return await axios.get(`/api/messages/chat-history/${conversationId}`);
}

export async function getConversationParticipants(conversationId) {
  return await axios.get(`/api/messages/chat-participants/${conversationId}`);
}
