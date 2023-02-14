import React from "react";

export default function ModalFeedBackMessage({ responseMessage, error }) {
  if (responseMessage === "") {
    return null;
  }

  if (error) {
    return (
      <h1 className="m-3 text-center font-medium text-red-500">
        {responseMessage}
      </h1>
    );
  }

  return (
    <h1 className="m-3 text-center font-medium text-green-500">
      {responseMessage}
    </h1>
  );
}
