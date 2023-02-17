import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chatRoom",
  initialState: {
    messages: [],
    conversationParticipants: [],
    messageIdsHashTable: {},
    videoCalling: {
      isCalling: false,
      videoConversationId: null,
    },
    chosenChatDetails: {
      conversationId: null,
      chatType: null,
      chatRoomName: null,
    },
    pending: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    resetChatState: (state) => {
      state.messages = [];
      state.conversationParticipants = [];
      state.messageIdsHashTable = {};
      state.chosenChatDetails = {
        conversationId: null,
        chatType: null,
        chatRoomName: null,
      };
      state.pending = false;
      state.error = false;
      state.errorMessage = "";
    },
    setChatDetail: (state, action) => {
      if (
        action.payload.conversationId !== state.chosenChatDetails.conversationId
      ) {
        state.chosenChatDetails = {
          conversationId: action.payload.conversationId,
          chatType: action.payload.chatType,
          chatRoomName: action.payload.chatRoomName,
        };
        state.messages = [];
        state.conversationParticipants = [];
        state.messageIdsHashTable = {};
      }
    },
    addMessage: (state, action) => {
      const conversationId = action.payload.conversationId;
      if (
        state.chosenChatDetails.conversationId === conversationId &&
        state.messageIdsHashTable[action.payload.message.id] == null
      ) {
        state.messages.push(action.payload.message);
        state.messageIdsHashTable[action.payload.message.id] = true;
      }
    },
    setChatHistory: (state, action) => {
      const conversationId = action.payload.conversationId;
      if (state.chosenChatDetails.conversationId === conversationId) {
        const responseMessage = action.payload.messages;
        for (let message of responseMessage) {
          if (state.messageIdsHashTable[message.id] == null) {
            state.messages.push(message);
            state.messageIdsHashTable[message.id] = true;
          }
        }
        state.messages.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          } else {
            return 1;
          }
        });
      }
    },
    setChatParticipants: (state, action) => {
      const conversationId = action.payload.conversationId;
      if (state.chosenChatDetails.conversationId === conversationId) {
        state.conversationParticipants =
          action.payload.conversationParticipants;
      }
    },
    setVideoCalling: (state, action) => {
      state.videoCalling = action.payload;
    },
  },
});

export const {
  resetChatState,
  setChatDetail,
  addMessage,
  setChatHistory,
  setChatParticipants,
  setVideoCalling,
} = chatSlice.actions;
export default chatSlice.reducer;
