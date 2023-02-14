import React from "react";
import NavList from "./SideBarNav/NavList";
import FriendList from "./FriendList/FriendList";
import GroupList from "./GroupList/GroupList";
import FriendRequestList from "./FriendRequestList/FriendRequestList";
import UserStatus from "./UserStatus/UserStatus";
import IconClose from "../../../assets/icon-uncheck.png";

export default function Sidebar({ openSideBar, setOpenSideBar }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div
      className={` absolute z-20 flex h-full w-96 transition duration-300 ease-in-out ${
        openSideBar ? "translate-x-0" : "-translate-x-96"
      } flex-col items-center border-r border-gray-300 bg-neutral-100 px-4 lg:static lg:-translate-x-0`}
    >
      {openSideBar ? (
        <img
          className="mt-2 self-start lg:hidden"
          src={IconClose}
          alt="mobile close sidebar"
          onClick={() => setOpenSideBar((prev) => !prev)}
        />
      ) : null}
      <UserStatus />
      <NavList activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {activeIndex === 0 ? (
        <FriendList />
      ) : activeIndex === 1 ? (
        <GroupList />
      ) : (
        <FriendRequestList />
      )}
    </div>
  );
}
