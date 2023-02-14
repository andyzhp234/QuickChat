import React from "react";
import ModalBody from "../../../../components/Modal/ModalBody";
import ModalContainer from "../../../../components/Modal/ModalContainer";
import ModalInput from "../../../../components/Modal/ModalInput";
import ModalCloseButton from "../../../../components/Modal/ModalCloseButton";
import ModalSubmitButton from "../../../../components/Modal/ModalSubmitButton";
import ModalFeedBackMessage from "../../../../components/Modal/ModalFeedBackMessage";
import { createGroupRequest } from "../../../../socketClient/socketController/group/group";

export default function NewGroupModal({ setModal }) {
  const [roomName, setRoomName] = React.useState("");
  const [error, setError] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [created, setCreated] = React.useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
    } else {
      Document.execCommand("copy", true, text);
    }
    setResponseMessage((prev) => {
      return {
        ...prev,
        message: "GroupID Copied!",
      };
    });
    return;
  }

  async function createGroupHandler(e) {
    e.preventDefault();
    await createGroupRequest(
      { roomName },
      ({ message, error, groupIdMessage }) => {
        if (error) {
          setError(true);
          setResponseMessage({ message, groupIdMessage });
        } else {
          setError(false);
          setResponseMessage({ message, groupIdMessage });
          setCreated(true);
        }
      }
    );
  }

  return (
    <ModalBody>
      <ModalContainer>
        <ModalFeedBackMessage
          responseMessage={responseMessage.message}
          error={error}
        />
        <h1 className="text-lg font-medium">Create A Group</h1>
        <h1 className="my-3 text-slate-600">
          Create a group to bring your friends together and enjoy seamless group
          conversations.
        </h1>
        <form className="w-full" onSubmit={createGroupHandler}>
          {created ? (
            <>
              <div className="my-2 rounded border py-3 text-center text-blue-700">
                {`GroupId: ${responseMessage.groupIdMessage}`}
              </div>
              <div
                className="my-2 flex w-full cursor-pointer items-center justify-center rounded bg-blue-600 p-1 text-center font-semibold text-white hover:bg-blue-700"
                onClick={() =>
                  copyTextToClipboard(responseMessage.groupIdMessage)
                }
              >
                Copy ID
              </div>
            </>
          ) : (
            <>
              <ModalInput
                labelName={"Room name"}
                inputValue={roomName}
                inputOnChange={(e) => setRoomName(e.target.value)}
                inputType={"text"}
                isRequired={true}
                altValue={"Room Name"}
              />
              <ModalSubmitButton text={"Create"} />
            </>
          )}
          <ModalCloseButton onClick={() => setModal((prev) => !prev)} />
        </form>
      </ModalContainer>
    </ModalBody>
  );
}
