import React from "react";

export default function ModalCloseButton({ onClick }) {
  return (
    <button
      className="flex w-full cursor-pointer justify-center rounded-2xl bg-red-600 p-1 font-medium text-white hover:bg-red-700"
      type="button"
      onClick={onClick}
    >
      Close
    </button>
  );
}
