import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatDetail } from "../../../../store/slices/chatSlice";
import Avatar from "../../../../components/Avatar";
import OnlineIndicater from "../../../../components/OnlineIndicater/OnlineIndicater";

export default function FriendListItem({ conversationId, username, isOnline }) {
  const dispatch = useDispatch();
  const selectedFriend = useSelector(
    (state) => state.chatRoom.chosenChatDetails.conversationId
  );

  async function chatFriendHandler(e) {
    dispatch(
      setChatDetail({
        conversationId,
        chatType: "direct",
        chatRoomName: username,
      })
    );
  }

  return (
    <div
      className={`my-1 flex h-10 w-full cursor-pointer items-center rounded-xl px-3 py-6 hover:bg-white ${
        conversationId === selectedFriend ? "bg-white shadow-lg" : ""
      }`}
      onClick={chatFriendHandler}
    >
      <Avatar username={username} abcde={false} />
      <div className="ml-1 px-2 font-semibold">{username}</div>
      {isOnline ? <OnlineIndicater /> : null}
    </div>
  );
}
