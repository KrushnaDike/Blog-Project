import { server } from "../store";
import axios from "axios";
import {
  contactFail,
  contactRequest,
  contactSuccess,
  createLogoFail,
  createLogoRequest,
  createLogoSuccess,
  enquiryFail,
  enquiryRequest,
  enquirySuccess,
  getAllContactsFail,
  getAllContactsRequest,
  getAllContactsSuccess,
  getAllEnquiriesFail,
  getAllEnquiriesRequest,
  getAllEnquiriesSuccess,
  getLogoFail,
  getLogoRequest,
  getLogoSuccess,
  updateLogoFail,
  updateLogoRequest,
  updateLogoSuccess,
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

export const enquiryUs =
  (postId, name, email, message, mobile) => async (dispatch) => {
    // console.log(name, email, mobile, message, postId);
    try {
      dispatch(enquiryRequest());
      const { data } = await axios.post(
        `${server}/other/enquiryMsg/${postId}`,
        { name, email, mobile, message },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(enquirySuccess(data.message));
    } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
      dispatch(enquiryFail(error.response.data.message));
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

// Get all Enquiries
export const getAllEnquiries = () => async (dispatch) => {
  try {
    dispatch(getAllEnquiriesRequest());
    const { data } = await axios.get(`${server}/other/getAllEnquiries`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getAllEnquiriesSuccess(data.enquiries));
  } catch (error) {
    console.log("🚀 ~ getAllPopups ~ error:", error);
    dispatch(getAllEnquiriesFail(error.response.data.message));
  }
};

export const getLogo = () => async (dispatch) => {
  try {
    dispatch(getLogoRequest());
    const { data } = await axios.get(`${server}/other/getLogo`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getLogoSuccess(data.logo));
  } catch (error) {
    console.log("🚀 ~ getAllPopups ~ error:", error);
    dispatch(getLogoFail(error.response.data.message));
  }
};

export const createLogo = (formdata) => async (dispatch) => {
  try {
    dispatch(createLogoRequest());
    const { data } = await axios.post(`${server}/other/createLogo`, formdata, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log(data);

    dispatch(createLogoSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(createLogoFail(error.response.data.message));
  }
};

export const updateLogo = (formdata) => async (dispatch) => {
  try {
    dispatch(updateLogoRequest());
    const { data } = await axios.put(`${server}/other/updateLogo`, formdata, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch(updateLogoSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(updateLogoFail(error.response.data.message));
  }
};
