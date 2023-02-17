import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoutIcon from "../../../../assets/icon-logout.png";
import { userLogoutAction } from "../../../../store/actions/apiUserActions";

export default function UserDropdownMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  });

  async function userLogoutHandler() {
    await dispatch(userLogoutAction());
    navigate("/login");
  }

  return (
    <div
      className={`absolute right-0 top-14 z-20 rounded-lg border bg-white shadow-lg transition duration-200 ease-in-out
      ${isVisible ? "opacity-100" : "opacity-0"} `}
    >
      <div
        className="flex cursor-pointer items-center overflow-hidden px-6 py-3 text-sm text-gray-700 duration-150 hover:bg-gray-200"
        onClick={userLogoutHandler}
      >
        <img className="h-5 w-5" src={LogoutIcon} alt="dropdown" />
        <h1 className="ml-2 font-semibold">Logout</h1>
      </div>
    </div>
  );
}
