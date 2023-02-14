import React from "react";
import Avatar from "../../../../components/Avatar";
import checkIcon from "../../../../assets/icon-check.png";
import unCheckIcon from "../../../../assets/icon-uncheck.png";
import { useDispatch } from "react-redux";
import { deleteFriendRequests } from "../../../../store/slices/friendsSlice";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../../../socketClient/socketController/friend-requests/friend-requests";

export default function FriendRequestListItem({ id, username }) {
  const dispatch = useDispatch();

  async function acceptFriendRequestHandler(e) {
    e.preventDefault();
    acceptFriendRequest({ id }, ({ errMessage }) => {
      if (errMessage) {
        console.log(errMessage);
      } else {
        dispatch(deleteFriendRequests(id));
      }
    });
  }

  async function rejectFriendRequestHandler(e) {
    e.preventDefault();
    rejectFriendRequest({ id }, ({ errMessage }) => {
      if (errMessage) {
        console.log(errMessage);
      } else {
        dispatch(deleteFriendRequests(id));
      }
    });
  }

  return (
    <div className="my-1 flex h-10 w-full cursor-pointer items-center rounded-xl px-3 py-6 hover:bg-white">
      <Avatar username={username} />
      <div className="px-2 font-semibold">{username}</div>
      <img
        className=" ml-auto h-4 w-4 cursor-pointer rounded-full duration-100 ease-in-out hover:h-5 hover:w-5"
        src={checkIcon}
        alt="accept friend request button"
        onClick={acceptFriendRequestHandler}
      />
      <img
        className="ml-3 h-4 w-4 cursor-pointer duration-100 ease-in-out hover:h-5 hover:w-5"
        src={unCheckIcon}
        alt="decline friend request button"
        onClick={rejectFriendRequestHandler}
      />
    </div>
  );
}
