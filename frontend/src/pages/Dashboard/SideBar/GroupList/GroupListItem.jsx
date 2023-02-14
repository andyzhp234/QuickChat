import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatDetail } from "../../../../store/slices/chatSlice";
import Avatar from "../../../../components/Avatar";

export default function GroupListItem({ conversationId, name }) {
  const dispatch = useDispatch();
  const selectedConversationId = useSelector(
    (state) => state.chatRoom.chosenChatDetails.conversationId
  );
  async function chatFriendHandler(e) {
    dispatch(
      setChatDetail({
        conversationId,
        chatType: "group",
        chatRoomName: name,
      })
    );
  }
  return (
    <div
      className={`my-1 flex h-10 w-full cursor-pointer items-center rounded-xl px-3 py-6 hover:bg-white ${
        conversationId === selectedConversationId ? "bg-white shadow-lg" : ""
      }`}
      onClick={chatFriendHandler}
    >
      <Avatar username={name} variant={"bauhaus"} />
      <div className="px-2 font-semibold">{name}</div>
    </div>
  );
}
