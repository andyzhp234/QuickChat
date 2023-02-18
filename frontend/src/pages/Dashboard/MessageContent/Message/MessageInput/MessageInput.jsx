import React from "react";
import { useSelector } from "react-redux";
import { sendMessage } from "../../../../../socketClient/socketController/messages/messages";
import IconSendMessage from "../../../../../assets/icon-send.png";
import IconOpenEmoji from "../../../../../assets/icon-smile-face.png";
import EmojiDropdown from "./EmojiDropdown";

export default function MessageInput({ scrollDown }) {
  const [messageText, setMessageText] = React.useState("");
  const [openDropdown, setOpenDropDown] = React.useState(false);
  const conversationId = useSelector(
    (state) => state.chatRoom.chosenChatDetails.conversationId
  );

  function sendMessageHandler(e) {
    e.preventDefault();
    if (messageText.length > 0) {
      sendMessage({
        conversationId: conversationId,
        content: messageText,
      });
      setTimeout(() => {
        scrollDown();
      }, 300);
    }
    setMessageText("");
  }

  return (
    <form
      className="absolute bottom-8 left-1/2 z-10 h-12 w-11/12 -translate-x-1/2 transform"
      onSubmit={sendMessageHandler}
    >
      {openDropdown ? <EmojiDropdown setMessageText={setMessageText} /> : null}
      <div className="flex h-14 w-full items-center justify-between overflow-hidden rounded-xl border border-gray-300 bg-white pr-5 shadow-lg">
        <input
          className="h-full flex-1 bg-white pl-4 focus:outline-none"
          placeholder="Type message here"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <img
          className="mx-3 h-8 w-8 cursor-pointer"
          onClick={() => setOpenDropDown((prev) => !prev)}
          src={IconOpenEmoji}
          alt={"open-emoji"}
        />
        <img
          className="h-8 w-8 cursor-pointer"
          onClick={sendMessageHandler}
          src={IconSendMessage}
          alt={"send-message"}
        />
      </div>
    </form>
  );
}
