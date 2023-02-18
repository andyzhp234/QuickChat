import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageSentByMe from "../MessageTypes/MessageSentByMe";
import MessageSentByOthers from "../MessageTypes/MessageSentByOthers";
import {
  setChatHistory,
  setChatParticipants,
} from "../../../../../store/slices/chatSlice";
import {
  getInitialChatHistory,
  getMoreChatHistory,
  getConversationParticipants,
} from "../../../../../lib/axios/messageAPIs.js";

export default function MessageWindow({
  messagesRef,
  scrollDown,
  setIsLoading,
}) {
  const [height, setHeight] = React.useState(window.innerHeight - 64);
  const dispatch = useDispatch();
  const conversationId = useSelector(
    (state) => state.chatRoom.chosenChatDetails.conversationId
  );
  const messages = useSelector((state) => state.chatRoom.messages);

  React.useEffect(() => {
    const fetchChatDatas = async () => {
      setIsLoading(true);
      const chatHisotryData = await getInitialChatHistory(conversationId);
      const chatParticipantsData = await getConversationParticipants(
        conversationId
      );
      await dispatch(setChatHistory(chatHisotryData.data));
      await dispatch(setChatParticipants(chatParticipantsData.data));
      setIsLoading(false);
      scrollDown();
    };
    fetchChatDatas();
  }, [getInitialChatHistory, conversationId]);

  async function handleScroll() {
    let messageCurrRef = messagesRef.current;
    if (messageCurrRef.scrollTop === 0) {
      setIsLoading(true);
      const chatHisotryData = await getMoreChatHistory(
        conversationId,
        messages[0].date
      );
      const newMessageHeight = messageCurrRef.scrollHeight;
      await dispatch(setChatHistory(chatHisotryData.data));
      messageCurrRef.scrollTop = messageCurrRef.scrollHeight - newMessageHeight;
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight - 64);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={messagesRef}
      onScroll={handleScroll}
      className="antiscroll-inner w-full overflow-y-auto pb-20"
      style={{ height: height }}
    >
      {messages.map((message) =>
        message.isSentByMe ? (
          <MessageSentByMe key={message.id} data={message} />
        ) : (
          <MessageSentByOthers key={message.id} data={message} />
        )
      )}
    </div>
  );
}
