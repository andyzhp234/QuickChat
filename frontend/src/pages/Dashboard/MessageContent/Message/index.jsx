import React from "react";
import { useSelector } from "react-redux";
import MessageWindow from "./MessageWindow/MessageWindow";
import MessageInput from "./MessageInput/MessageInput";
import LoadingModal from "../../../../components/LoadingModal";
import VideoWindow from "../../../../components/VideoWindow";

export default function Message() {
  const messagesEndRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const videoCallingInfo = useSelector((state) => state.chatRoom.videoCalling);

  const scrollDown = () => {
    messagesEndRef.current.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col">
      {isLoading ? <LoadingModal /> : null}
      {videoCallingInfo.isCalling ? <VideoWindow /> : null}
      <div className="relative flex h-full w-full">
        <MessageWindow
          messagesEndRef={messagesEndRef}
          scrollDown={scrollDown}
          setIsLoading={setIsLoading}
        />
        <MessageInput scrollDown={scrollDown} />
      </div>
    </div>
  );
}
