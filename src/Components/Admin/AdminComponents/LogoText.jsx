import React, { useState, useEffect } from "react";
import { Form, Button, message } from "antd";
import { SaveOutlined, EditOutlined } from "@ant-design/icons";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../../../redux/reducers/otherReducer";
import { toast } from "react-toastify";
import { createLogo, getLogo, updateLogo } from "../../../redux/actions/other";
import Loader from "../../Layout/Loader/Loader";

const LogoText = () => {
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [isNew, setIsNew] = useState(true);

  const [form] = Form.useForm();

  const { logo, loading, error, message } = useSelector((state) => state.other);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogo());

    if (logo && logo.logoImage) {
      const existingImage = logo.logoImage.url;
      if (existingImage) {
        setAvatar(existingImage);
        setIsNew(false);
      }
    }
  }, [dispatch, logo]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setAvatar(reader.result);
      setImage(file);
    };
  };

  const handleSaveOrUpdate = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      try {
        if (isNew) {
          // Add new logo image
          dispatch(createLogo(formData));
        } else {
          // Update existing logo image
          dispatch(updateLogo(formData));
        }
      } catch (error) {
        message.error("Failed to save or update image.");
      }
    }
  };

  return (
    <Layout>
      <div className="p-5 bg-white shadow rounded">
        <Form form={form} layout="vertical">
          <Form.Item
            name="thumbnailImage"
            label="Upload Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <input
              id="chooseAvatar"
              name="chooseAvatar"
              type="file"
              accept="image/*"
              onChange={imageHandler}
              className="mt-1 block w-50 px-3 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
            {avatar && (
              <div className="mt-4">
                <img
                  src={avatar}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border border-gray-200"
                />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={isNew ? <SaveOutlined /> : <EditOutlined />}
              onClick={handleSaveOrUpdate}
              className="mt-4"
            >
              {isNew ? "Save" : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default LogoText;
