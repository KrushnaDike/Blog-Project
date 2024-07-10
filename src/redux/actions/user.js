import axios from "axios";
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutRequest,
  logoutSuccess,
} from "../reducers/userReducer";
import { server } from "../store";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(
      `${server}/user/login`,
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(loginSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(loginFail(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${server}/user/getMyProfile`, {
      withCredentials: true,
    });

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });

    dispatch(logoutSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(logoutFail(error.response.data.message));
  }
};
