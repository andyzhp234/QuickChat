import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: "friendsLists",
  initialState: {
    offlineFriends: [],
    onlineFriends: [],
    friendRequests: [],
    pending: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    resetFriendsState: (state) => {
      state.offlineFriends = [];
      state.onlineFriends = [];
      state.friendRequests = [];
      state.pending = false;
      state.error = false;
      state.errorMessage = "";
    },
    friendIsOnline: (state, action) => {
      let targetFriend;
      for (let i = 0; i < state.offlineFriends.length; i++) {
        if (state.offlineFriends[i].id === action.payload) {
          targetFriend = state.offlineFriends[i];
          state.offlineFriends.splice(i, 1);
          break;
        }
      }
      state.onlineFriends.push(targetFriend);
    },
    friendIsOffline: (state, action) => {
      let targetFriend;
      for (let i = 0; i < state.onlineFriends.length; i++) {
        if (state.onlineFriends[i].id === action.payload) {
          targetFriend = state.onlineFriends[i];
          state.onlineFriends.splice(i, 1);
          break;
        }
      }
      state.offlineFriends.push(targetFriend);
    },
    setOnlineFriends: (state, action) => {
      state.onlineFriends = action.payload;
    },
    setOfflineFriends: (state, action) => {
      state.offlineFriends = action.payload;
    },
    newOnlineFriend: (state, action) => {
      state.onlineFriends.push(action.payload);
    },
    newOfflineFriend: (state, action) => {
      state.offlineFriends.push(action.payload);
    },
    setFriendRequests: (state, action) => {
      state.friendRequests = action.payload;
    },
    addFriendRequests: (state, action) => {
      state.friendRequests.push(action.payload);
    },
    deleteFriendRequests: (state, action) => {
      state.friendRequests = state.friendRequests.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  resetFriendsState,
  friendIsOnline,
  friendIsOffline,
  setOnlineFriends,
  setOfflineFriends,
  newOnlineFriend,
  newOfflineFriend,
  setFriendRequests,
  addFriendRequests,
  deleteFriendRequests,
} = friendsSlice.actions;
export default friendsSlice.reducer;
