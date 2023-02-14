import React from "react";

export default function ChatRoomButton({ label }) {
  return (
    <div
      className="m-2 box-border flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden
       rounded-md bg-slate-500 text-white duration-300 hover:rounded-2xl hover:bg-slate-600"
    >
      {label}
    </div>
  );
}
