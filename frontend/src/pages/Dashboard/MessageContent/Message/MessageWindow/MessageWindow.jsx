import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageSentByMe from "../MessageTypes/MessageSentByMe";
import MessageSentByOthers from "../MessageTypes/MessageSentByOthers";
import {
  setChatHistory,
  setChatParticipants,
} from "../../../../../store/slices/chatSlice";
import {
  getChatHistory,
  getConversationParticipants,
} from "../../../../../lib/axios/messageAPIs.js";

export default function MessageWindow({
  messagesEndRef,
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
      const chatHisotryData = await getChatHistory(conversationId);
      const chatParticipantsData = await getConversationParticipants(
        conversationId
      );
      await dispatch(setChatHistory(chatHisotryData.data));
      await dispatch(setChatParticipants(chatParticipantsData.data));
      setIsLoading(false);
      scrollDown();
    };
    fetchChatDatas();
  }, [getChatHistory, conversationId]);

  return (
    <div
      ref={messagesEndRef}
      className="antiscroll-inner h-full-16 w-full overflow-y-auto pb-24"
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
