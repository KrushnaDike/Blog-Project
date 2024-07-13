import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import Layout from "./Layout";

const { Option } = Select;

const QuickLinks = () => {
  const [quickLinks, setQuickLinks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://blogger-backend-p9yl.onrender.com/api/quicklinks")
      .then((response) => {
        setQuickLinks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quick links:", error);
        message.error("Failed to fetch quick links. Please try again.");
      });
  };

  const handleAddLink = () => {
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
      .delete(`https://blogger-backend-p9yl.onrender.com/api/quicklinks/${id}`)
      .then((response) => {
        console.log("Quick link deleted:", response.data);
        fetchData(); // Refresh table data after delete
        message.success("Quick link deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting quick link:", error);
        message.error("Failed to delete quick link. Please try again.");
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
      ? `https://blogger-backend-p9yl.onrender.com/api/quicklinks/${initialData._id}`
      : "https://blogger-backend-p9yl.onrender.com/api/quicklinks";
    const axiosMethod = initialData ? axios.put : axios.post;

    axiosMethod(apiUrl, values)
      .then((response) => {
        console.log("Quick link saved:", response.data);
        fetchData(); // Refresh table data after save/update
        message.success("Quick link saved successfully!");
        setLoading(false);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error("Error saving quick link:", error);
        message.error("Failed to save quick link. Please try again.");
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
      width: 100,
      defaultSortOrder: "ascend",
    }, // Decrease column width to 100px
    { title: "Title", dataIndex: "title", key: "title", width: 200 }, // Increase column width to 200px
    { title: "URL", dataIndex: "url", key: "url" },
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
          <h2 className="font-bold">ALL QUICK LINKS</h2>
          <Button type="primary" onClick={handleAddLink}>
            + Add Quick Link
          </Button>
        </div>
        <Table
          dataSource={quickLinks}
          columns={columns}
          pagination={{ pageSize: 10 }}
          rowKey="_id"
          defaultSortOrder="ascend"
        />

        <Modal
          title={initialData ? "Edit Quick Link" : "Add Quick Link"}
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
              name="language"
              label="Language"
              rules={[{ required: true, message: "Please select a language!" }]}
            >
              <Select placeholder="Select a Language">
                <Option value="English">English</Option>
                <Option value="Arabic">Arabic</Option>
                <Option value="Spanish">Spanish</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter a title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="url"
              label="URL"
              rules={[{ required: true, message: "Please enter a URL!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="serialNumber"
              label="Serial Number"
              rules={[
                { required: true, message: "Please enter a serial number!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default QuickLinks;
