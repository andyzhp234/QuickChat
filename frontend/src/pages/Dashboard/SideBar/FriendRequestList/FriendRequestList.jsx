import React from "react";
import FriendRequestListItem from "./FriendRequestListItem";
import { useSelector } from "react-redux";

export default function FriendRequestList() {
  const friendRequestsList = useSelector(
    (state) => state.friendsLists.friendRequests
  );
  return (
    <div className="antiscroll-inner mt-2 mb-2 flex h-full w-full flex-col items-center overflow-y-auto">
      {friendRequestsList.map((inv) => (
        <FriendRequestListItem
          id={inv.id}
          key={inv.id}
          username={inv.senderUser.username}
        />
      ))}
    </div>
  );
}
