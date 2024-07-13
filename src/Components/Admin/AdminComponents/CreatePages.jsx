import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Checkbox,
} from "antd";
import axios from "axios";
import Layout from "./Layout";

const { Option } = Select;

const CreatePages = () => {
  const [pages, setPages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://blogger-backend-p9yl.onrender.com/api/pages")
      .then((response) => {
        setPages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pages:", error);
        message.error("Failed to fetch pages. Please try again.");
      });
  };

  const handleAddPage = () => {
    setIsModalVisible(true);
    setInitialData(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setInitialData(null);
    form.resetFields();
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://blogger-backend-p9yl.onrender.com/api/pages/${id}`)
      .then((response) => {
        console.log("Page deleted:", response.data);
        fetchData(); // Refresh table data after delete
        message.success("Page deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting page:", error);
        message.error("Failed to delete page. Please try again.");
      });
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setInitialData(record);
    form.setFieldsValue(record);
  };

  const onFinish = (values) => {
    setLoading(true);

    const apiUrl = initialData
      ? `https://blogger-backend-p9yl.onrender.com/api/pages/${initialData._id}`
      : "https://blogger-backend-p9yl.onrender.com/api/pages";
    const axiosMethod = initialData ? axios.put : axios.post;

    axiosMethod(apiUrl, values)
      .then((response) => {
        console.log("Page saved:", response.data);
        fetchData(); // Refresh table data after save/update
        message.success("Page saved successfully!");
        setLoading(false);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error("Error saving page:", error);
        message.error("Failed to save page. Please try again.");
        setLoading(false);
      });
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Layout>
    <div className="flex-1 p-5 bg-white">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2 className="font-bold">ALL PAGES</h2>
        <Button type="primary" onClick={handleAddPage}>
          + Add Page
        </Button>
      </div>
      <Table
        dataSource={pages}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
      />

      <Modal
        title={initialData ? "Edit Page" : "Add Page"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            {initialData ? "Update" : "Save"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialData}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input placeholder="Enter Title" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter the content!" }]}
          >
            <Input.TextArea rows={6} placeholder="Enter Content" />
          </Form.Item>

          <Form.Item name="metaKeywords" label="Meta Keywords">
            <Input placeholder="Enter Meta Keywords" />
          </Form.Item>

          <Form.Item name="metaDescription" label="Meta Description">
            <Input.TextArea rows={4} placeholder="Enter Meta Description" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select placeholder="Select Status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item name="cloneForOtherLanguage" valuePropName="checked">
            <Checkbox>Clone for عربي or other language</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

    </div>
    </Layout>
  );
};

export default CreatePages;
