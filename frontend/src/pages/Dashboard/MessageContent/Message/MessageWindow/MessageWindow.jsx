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

  return (
    <div
      ref={messagesRef}
      onScroll={handleScroll}
      className="antiscroll-inner h-full-16 w-full overflow-y-auto pb-28"
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
