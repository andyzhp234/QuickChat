import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import WelcomeMessage from "./WelcomeMessage";
import AppBar from "../AppBar";

export default function MessageContent({
  setOpenSideBar,
  setOpenDetailSideBar,
}) {
  const chatRoomName = useSelector(
    (state) => state.chatRoom.chosenChatDetails.chatRoomName
  );

  return (
    <div className="flex h-full w-full flex-col">
      <AppBar
        setOpenSideBar={setOpenSideBar}
        setOpenDetailSideBar={setOpenDetailSideBar}
      />
      {chatRoomName ? <Message /> : <WelcomeMessage />}
    </div>
  );
}
