import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const ImageUpload = ({ setImage }) => {
  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "newImage"); // Replace with your Cloudinary upload preset

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dlqh7mjvo/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImage(uploadResponse.data.secure_url);
      onSuccess("OK");
    } catch (error) {
      console.error("Error uploading image:", error);
      onError(error);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng;
  };

  return (
    <Upload
      name="avatar"
      showUploadList={false}
      customRequest={handleUpload}
      beforeUpload={beforeUpload}
    >
      <div style={{ cursor: "pointer" }}>
        <LoadingOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  );
};

export default ImageUpload;
