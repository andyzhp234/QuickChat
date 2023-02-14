import React from "react";
import ModalBody from "../../../../components/Modal/ModalBody";
import ModalContainer from "../../../../components/Modal/ModalContainer";
import ModalInput from "../../../../components/Modal/ModalInput";
import ModalCloseButton from "../../../../components/Modal/ModalCloseButton";
import ModalSubmitButton from "../../../../components/Modal/ModalSubmitButton";
import ModalFeedBackMessage from "../../../../components/Modal/ModalFeedBackMessage";
import { joinGroupRequest } from "../../../../socketClient/socketController/group/group";

export default function JoinGroupModal({ setModal }) {
  const [groupId, setGroupId] = React.useState("");
  const [error, setError] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [joined, setJoined] = React.useState(false);

  async function joinGroupHandler(e) {
    e.preventDefault();
    await joinGroupRequest({ groupId }, ({ message, error }) => {
      if (error) {
        setError(true);
        setResponseMessage(message);
      } else {
        setError(false);
        setResponseMessage(message);
        setJoined(true);
      }
    });
  }

  return (
    <ModalBody>
      <ModalContainer>
        {joined ? (
          <div>
            <h1 className="p-10 text-center text-xl font-semibold text-green-500">
              Nice! You just joined a Group Chatroom!
            </h1>
            <ModalCloseButton onClick={() => setModal((prev) => !prev)} />
          </div>
        ) : (
          <>
            <ModalFeedBackMessage
              responseMessage={responseMessage}
              error={error}
            />
            <h1 className="text-lg font-medium">Join A Group</h1>
            <h1 className="my-3 text-slate-600">
              Enter the Group ID to join a Group Chatroom
            </h1>
            <form className="w-full" onSubmit={joinGroupHandler}>
              <ModalInput
                labelName={"Group ID"}
                inputValue={groupId}
                inputOnChange={(e) => setGroupId(e.target.value)}
                inputType={"text"}
                isRequired={true}
                altValue={"GroupId"}
              />
              <ModalSubmitButton text={"Join"} />
              <ModalCloseButton onClick={() => setModal((prev) => !prev)} />
            </form>
          </>
        )}
      </ModalContainer>
    </ModalBody>
  );
}
