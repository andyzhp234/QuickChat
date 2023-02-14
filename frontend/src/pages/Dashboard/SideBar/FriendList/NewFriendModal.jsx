import React from "react";
import { sendFriendRequest } from "../../../../socketClient/socketController/friend-requests/friend-requests";
import ModalContainer from "../../../../components/Modal/ModalContainer";
import ModalBody from "../../../../components/Modal/ModalBody";
import ModalInput from "../../../../components/Modal/ModalInput";
import ModalCloseButton from "../../../../components/Modal/ModalCloseButton";
import ModalSubmitButton from "../../../../components/Modal/ModalSubmitButton";
import ModalFeedBackMessage from "../../../../components/Modal/ModalFeedBackMessage";

export default function NewFriendModal({ setModal }) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState("");

  async function addFriendsHandler(e) {
    e.preventDefault();
    await sendFriendRequest({ email }, ({ message, error }) => {
      if (error) {
        setError(true);
        setResponseMessage(message);
      } else {
        setError(false);
        setResponseMessage(message);
      }
    });
  }

  return (
    <ModalBody>
      <ModalContainer>
        <ModalFeedBackMessage responseMessage={responseMessage} error={error} />
        <h1 className="text-lg font-medium">Add your friend</h1>
        <h1 className="my-3 text-slate-600">
          Enter the Email Address of the friend which you would like to add
        </h1>
        <form className="w-full" onSubmit={addFriendsHandler}>
          <ModalInput
            labelName={"Email"}
            inputValue={email}
            inputOnChange={(e) => setEmail(e.target.value)}
            inputType={"email"}
            isRequired={true}
            altValue={"email_address"}
          />
          <ModalSubmitButton text={"Add"} />
          <ModalCloseButton onClick={() => setModal((prev) => !prev)} />
        </form>
      </ModalContainer>
    </ModalBody>
  );
}
