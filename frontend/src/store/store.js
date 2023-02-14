import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import friendsSlice from "./slices/friendsSlice";
import chatSlice from "./slices/chatSlice";
import groupsSlice from "./slices/groupsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    friendsLists: friendsSlice,
    chatRoom: chatSlice,
    groups: groupsSlice,
  },
});
