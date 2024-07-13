import axios from "axios";
import { server } from "../store";
import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
} from "../reducers/adminReducer";

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());
    const { data } = await axios.get(`${server}/user/getAllUsers`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getAllUsersSuccess(data.users));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(getAllUsersFail(error.response.data.message));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    const { data } = await axios.delete(`${server}/user/deleteUser/${userId}`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(deleteUserSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(deleteUserFail(error.response.data.message));
  }
};
