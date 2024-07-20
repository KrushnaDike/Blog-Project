import { server } from "../store";
import axios from "axios";
import {
  contactFail,
  contactRequest,
  contactSuccess,
  getAllContactsFail,
  getAllContactsRequest,
  getAllContactsSuccess,
} from "../reducers/otherReducer";

export const contactUs = (name, email, mobile, message) => async (dispatch) => {
  try {
    dispatch(contactRequest());
    const { data } = await axios.post(
      `${server}/other/contact`,
      { name, email, mobile, message },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(contactSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(contactFail(error.response.data.message));
  }
};

// Get all contacts
export const getAllContacts = () => async (dispatch) => {
  try {
    dispatch(getAllContactsRequest());
    const { data } = await axios.get(`${server}/other/getAllContacts`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getAllContactsSuccess(data.contacts));
  } catch (error) {
    console.log("🚀 ~ getAllPopups ~ error:", error);
    dispatch(getAllContactsFail(error.response.data.message));
  }
};
