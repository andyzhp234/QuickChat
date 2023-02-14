import {
  resetUserState,
  loginRequest,
  loginFailed,
  loginSuccess,
  registerRequest,
  registerFailed,
  registerSuccess,
} from "../slices/userSlice";
import { resetChatState } from "../slices/chatSlice";
import { resetFriendsState } from "../slices/friendsSlice";
import { socketDisconnect } from "../../socketClient/socketController/disconnect/disconnect.js";
import { loginAPI, registerAPI, logoutAPI } from "../../lib/axios/authAPIs.js";
import { resetGroupsState } from "../slices/groupsSlice";

export const userLoginAction = (email, password) => {
  return async (dispatch) => {
    dispatch(resetUserState());
    dispatch(loginRequest());
    try {
      const { data } = await loginAPI({ email, password });
      // store the csrf in redux state
      dispatch(loginSuccess(data.csrfToken));
      localStorage.setItem("csrfToken", data.csrfToken);
      return { error: false, message: "" };
    } catch (error) {
      let errMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(loginFailed(errMessage));
      return {
        error: true,
        message: errMessage,
      };
    }
  };
};

export const userRegisterAction = (email, username, password) => {
  return async (dispatch) => {
    dispatch(resetUserState());
    dispatch(registerRequest());
    try {
      const { data } = await registerAPI({ email, username, password });
      dispatch(registerSuccess(data.csrfToken));
      localStorage.setItem("csrfToken", data.csrfToken);
      return { error: false, message: "" };
    } catch (error) {
      let errMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(registerFailed(errMessage));
      return {
        error: true,
        message: errMessage,
      };
    }
  };
};

export const userLogoutAction = () => {
  return async (dispatch) => {
    socketDisconnect();
    localStorage.removeItem("csrfToken");
    dispatch(resetUserState());
    dispatch(resetChatState());
    dispatch(resetFriendsState());
    dispatch(resetGroupsState());
    await logoutAPI();
  };
};
