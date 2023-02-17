import io from "socket.io-client";
import {
  friendIsOnline,
  friendIsOffline,
  setOnlineFriends,
  setOfflineFriends,
  newOnlineFriend,
  newOfflineFriend,
  setFriendRequests,
  addFriendRequests,
} from "../store/slices/friendsSlice";
import { setGroupsList, addNewGroups } from "../store/slices/groupsSlice";
import { addMessage } from "../store/slices/chatSlice";
import { setUsername } from "../store/slices/userSlice";
import { store } from "../store/store";

let socket = null;
let socketServerUrl = "http://127.0.0.1:3000";
// let socketServerUrl = `https://api.quick-chat.app`;

export const connectWithSocketServer = () => {
  socket = io(socketServerUrl, {
    withCredentials: true,
  });

  socket.on("connect", () => {});
  socket.on("get-username", (data) => {
    if (data.username) store.dispatch(setUsername(data.username));
  });
  socket.on("friend-online", (data) => {
    if (data.friend) store.dispatch(friendIsOnline(data.friend));
  });
  socket.on("friend-offline", (data) => {
    if (data.friend) store.dispatch(friendIsOffline(data.friend));
  });
  socket.on("friend-list-online", (data) => {
    if (data.friends) store.dispatch(setOnlineFriends(data.friends));
  });
  socket.on("friend-list-offline", (data) => {
    if (data.friends) store.dispatch(setOfflineFriends(data.friends));
  });
  socket.on("new-friend-online", (data) => {
    if (data.friend) store.dispatch(newOnlineFriend(data.friend));
  });
  socket.on("new-friend-offline", (data) => {
    if (data.friend) store.dispatch(newOfflineFriend(data.friend));
  });
  socket.on("friend-requests-list", (data) => {
    if (data.friendRequests)
      store.dispatch(setFriendRequests(data.friendRequests));
  });
  socket.on("friend-request", (data) => {
    if (data.friendRequest)
      store.dispatch(addFriendRequests(data.friendRequest));
  });
  socket.on("new-chat-message", (data) => {
    if (data) store.dispatch(addMessage(data));
  });
  socket.on("groups-chatroom-list", (data) => {
    if (data) store.dispatch(setGroupsList(data));
  });
  socket.on("new-groups-chatroom", (data) => {
    if (data) store.dispatch(addNewGroups(data));
  });
};

export { socket };
