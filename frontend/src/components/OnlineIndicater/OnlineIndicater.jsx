import React from "react";

export default function OnlineIndicater({ isRight = true }) {
  return (
    <div
      className={`${
        isRight ? "ml-auto" : ""
      } h-3 w-3 rounded-full bg-green-400`}
    ></div>
  );
}
