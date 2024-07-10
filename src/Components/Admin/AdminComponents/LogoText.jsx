// LogoText.jsx

import React, { useState } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Layout from "./Layout";

const LogoText = () => {
  const [form] = Form.useForm();
  const [logoFileList, setLogoFileList] = useState([]);

  const handleLogoChange = ({ fileList }) => {
    setLogoFileList(fileList);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Implement your logic to save/update data (e.g., API call)

    // Reset form fields and file list
    form.resetFields();
    setLogoFileList([]);
    message.success("Footer information saved successfully!");
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only JPG, PNG, JPEG, or SVG images are allowed!");
    }
    return isImage;
  };

  return (
    <Layout>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          footerLogo: null, // Initial value for logo, if any
          aboutCompany: "", // Initial value for about company
          copyrightText: "© 2021 Olima all rights reserved.", // Initial value for copyright text
        }}
      >
        <Form.Item
          name="footerLogo"
          label="Footer Logo"
          valuePropName="fileList"
          getValueFromEvent={handleLogoChange}
          rules={[{ required: true, message: "Please upload a footer logo!" }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            maxCount={1}
            fileList={logoFileList}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Logo</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="aboutCompany"
          label="About Company"
          rules={[
            { required: true, message: "Please enter about company text!" },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter About Company text" />
        </Form.Item>

        <Form.Item
          name="copyrightText"
          label="Copyright Text"
          rules={[{ required: true, message: "Please enter copyright text!" }]}
        >
          <Input placeholder="Enter Copyright Text" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default LogoText;
