import React from "react";
import { useSelector } from "react-redux";
import IconVerticalMenu from "../../../assets/icon-vertical-menu.png";
import IconAbout from "../../../assets/icon-about.png";
import IconVideoCall from "../../../assets/icon-video-call.png";

export default function AppBar({ setOpenSideBar, setOpenDetailSideBar }) {
  const chosenChatDetails = useSelector(
    (state) => state.chatRoom.chosenChatDetails
  );

  return (
    <div className="sticky flex h-16 w-full items-center justify-between border-b border-gray-300 bg-white p-5 text-sm font-semibold md:p-7 md:text-lg lg:p-10">
      <img
        className="h-6 w-6 lg:hidden"
        src={IconVerticalMenu}
        alt="vertical Menu"
        onClick={() => setOpenSideBar((prev) => !prev)}
      />
      {!chosenChatDetails.conversationId ? (
        <h1>Click on your friends or groups to start chatting</h1>
      ) : chosenChatDetails.chatType === "direct" ? (
        <h1>Direct Message with {chosenChatDetails.chatRoomName}</h1>
      ) : (
        <h1>Group Chat with {chosenChatDetails.chatRoomName}</h1>
      )}

      {chosenChatDetails.conversationId ? (
        chosenChatDetails.chatType === "direct" ? (
          <img
            className="h-8 w-8 cursor-pointer"
            src={IconVideoCall}
            alt="close ChatDetail sidebar"
            onClick={() => setOpenDetailSideBar((prev) => !prev)}
          />
        ) : (
          <img
            className="h-8 w-8 cursor-pointer"
            src={IconAbout}
            alt="close ChatDetail sidebar"
            onClick={() => setOpenDetailSideBar((prev) => !prev)}
          />
        )
      ) : (
        <div></div>
      )}
    </div>
  );
}
