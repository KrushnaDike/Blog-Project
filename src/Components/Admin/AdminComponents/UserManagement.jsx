import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Image } from "antd";
import axios from "axios";
import Layout from "./Layout"; // Ensure this path is correct

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...editingUser, image });
  }, [editingUser, image, form]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://example.com/api/users"); // Replace with your API endpoint
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "_id", key: "id" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          width={50}
          src={image}
          alt="User Image"
          fallback="https://via.placeholder.com/50"
        />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
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

  const handleAddUser = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage("");
    setEditingUser(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const { name, email, password, role } = values;

      let imageUrl = image;
      if (typeof image !== "string") {
        const formData = new FormData();
        formData.append("file", image);
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

        imageUrl = uploadResponse.data.secure_url;
      }

      if (editingUser) {
        // Update existing user
        const updatedUser = {
          ...editingUser,
          name,
          email,
          role,
          image: imageUrl,
        };

        await axios.put(
          `https://example.com/api/users/${editingUser._id}`,
          updatedUser
        );

        setUsers(
          users.map((user) =>
            user._id === editingUser._id ? updatedUser : user
          )
        );
      } else {
        // Add new user
        const newUserResponse = await axios.post(
          "https://example.com/api/users",
          {
            name,
            email,
            password,
            role,
            image: imageUrl,
          }
        );

        setUsers([...users, newUserResponse.data]);
      }

      setIsModalVisible(false);
      form.resetFields();
      setImage("");
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://example.com/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Layout>
      <div className="flex-1 p-5 bg-white">
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <h2>User Management</h2>
            <Button type="primary" onClick={handleAddUser}>
              + Add User
            </Button>
          </div>
          <Table dataSource={users} columns={columns} />

          <Modal
            title={editingUser ? "Edit User" : "Add User"}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="save" type="primary" onClick={handleSave}>
                Save
              </Button>,
            ]}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please enter the user's name" },
                ]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter the user's email" },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter the user's password",
                  },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select placeholder="Select a Role">
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="user">User</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="image"
                label="User Image"
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="User"
                    style={{
                      marginTop: "10px",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
