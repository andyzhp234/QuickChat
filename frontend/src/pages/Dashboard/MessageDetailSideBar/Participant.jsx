import React from "react";
import Avatar from "../../../components/Avatar";

export default function Participant({ username }) {
  return (
    <div className="my-1 flex h-10 w-full items-center rounded py-6">
      <Avatar username={username} />
      <div className="px-2 font-semibold">{username}</div>
    </div>
  );
}
