import React from "react";
import Avatar from "../../../../components/Avatar";
import OnlineIndicater from "../../../../components/OnlineIndicater/OnlineIndicater";
import { useSelector } from "react-redux";
import DropdownIcon from "../../../../assets/icon-ellipsis.png";
import UserDropdownMenu from "./UserDropdownMenu";

export default function UserStatus() {
  const username = useSelector((state) => state.user.username);
  const [openDropdown, setOpenDropDown] = React.useState(false);
  return (
    <div className="relative mt-4 flex w-full items-center rounded-2xl border bg-white py-3 px-4 shadow-sm">
      <Avatar username={username} size={40} />
      <div className="px-2 pl-3">
        <h1 className="text-xl font-semibold">{username}</h1>
        <div className="flex items-center">
          <OnlineIndicater isRight={false} />
          <h2 className="ml-1 text-xs text-green-500">Online</h2>
        </div>
      </div>
      <img
        className="ml-auto h-5 w-5 cursor-pointer duration-100"
        src={DropdownIcon}
        onClick={() => setOpenDropDown((prev) => !prev)}
      />
      {openDropdown ? <UserDropdownMenu /> : null}
    </div>
  );
}
