import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enquiryUs } from "../../redux/actions/other";
import { clearError, clearMessage } from "../../redux/reducers/otherReducer";
import { toast } from "react-toastify";

export default function Enquiry({ postName, postId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobileNumber: "",
  });

  console.log(postId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const {
    error,
    message: stateMessage,
    loading,
  } = useSelector((state) => state.other);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      enquiryUs(
        postId,
        formData.name,
        formData.email,
        formData.message,
        formData.mobileNumber
      )
    );

    setFormData({
      name: "",
      email: "",
      message: "",
      mobileNumber: "",
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (stateMessage) {
      toast.success(stateMessage);
      dispatch(clearMessage());
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">
            Enquiry Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-purple-500 text-white py-2 px-4 rounded-md"
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>
    </div>
  );
}
