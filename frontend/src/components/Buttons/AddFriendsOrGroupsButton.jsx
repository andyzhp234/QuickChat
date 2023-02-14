import React from "react";
import AddIcon from "../../assets/icon-add.png";
import JoinIcon from "../../assets/icon-join.png";

export default function AddFriendsOrGroupsButton({ text, onClick, join }) {
  return (
    <div
      className="my-1 flex h-10 w-full cursor-pointer items-center rounded-xl px-3 py-6 hover:bg-white"
      onClick={onClick}
    >
      {join ? (
        <img src={JoinIcon} alt="join" />
      ) : (
        <img src={AddIcon} alt="add" />
      )}
      <h1 className="ml-3 font-medium">{text}</h1>
    </div>
  );
}
