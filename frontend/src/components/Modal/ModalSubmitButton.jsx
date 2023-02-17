import React from "react";

export default function ModalSubmitButton({ text }) {
  return (
    <button
      className="my-2 flex w-full cursor-pointer justify-center rounded-2xl bg-green-600 p-2 font-medium text-white hover:bg-green-700"
      type="submit"
    >
      {text}
    </button>
  );
}
