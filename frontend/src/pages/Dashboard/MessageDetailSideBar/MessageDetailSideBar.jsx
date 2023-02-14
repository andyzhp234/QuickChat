import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Participant from "./Participant";
import IconUnCheck from "../../../assets/icon-uncheck.png";
import IconVideoCall from "../../../assets/icon-video-call.png";
import Avatar from "../../../components/Avatar";
import { setVideoCalling } from "../../../store/slices/chatSlice";

export default function MessageDetailSideBar({
  openDetailSideBar,
  setOpenDetailSideBar,
}) {
  const dispatch = useDispatch();
  const participants = useSelector(
    (state) => state.chatRoom.conversationParticipants
  );
  const chatRoomDetail = useSelector(
    (state) => state.chatRoom.chosenChatDetails
  );
  async function openVideoCallingHandler() {
    dispatch(
      setVideoCalling({
        isCalling: true,
        videoConversationId: null,
      })
    );
  }

  return (
    <div
      className={`antiscroll-inner absolute right-0 z-30 flex h-full w-80 transition duration-300 ease-in-out ${
        openDetailSideBar ? "translate-x-0" : "translate-x-96 lg:hidden"
      } flex-col items-center border-l border-gray-300 bg-white p-3 px-4 lg:static`}
    >
      <div className="mb-5 flex w-full items-center justify-between">
        <h1 className="font-semibold">Conversation Detail</h1>
        <img
          className="h-5 w-5 cursor-pointer"
          src={IconUnCheck}
          alt="close messageDetail sidebar"
          onClick={() => setOpenDetailSideBar((prev) => !prev)}
        />
      </div>
      <Avatar
        username={chatRoomDetail?.chatRoomName ?? ""}
        variant={chatRoomDetail?.chatType === "direct" ? "beam" : "bauhaus"}
        size={100}
      />
      <h1 className="mt-3 text-2xl font-semibold">
        {chatRoomDetail.chatRoomName}
      </h1>
      {chatRoomDetail.chatType === "direct" ? (
        <div
          className="mt-5 flex h-12 w-fit cursor-pointer items-center rounded bg-gray-200 px-4 hover:bg-gray-300"
          onClick={openVideoCallingHandler}
        >
          <img className="h-6 w-6" src={IconVideoCall} alt="video call" />
          <h1 className="ml-3 font-semibold text-gray-700">Video Chat</h1>
        </div>
      ) : (
        <div className="mt-3 w-full border-t-2 pt-2">
          <h1 className="font-medium">Members</h1>
          {participants.map(({ participant }, index) => (
            <Participant key={index} username={participant.username} />
          ))}
        </div>
      )}
    </div>
  );
}
