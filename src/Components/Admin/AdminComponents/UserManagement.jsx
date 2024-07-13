import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Image } from "antd";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser, getAllUsers } from "../../../redux/actions/admin";
import { clearError, clearMessage } from "../../../redux/reducers/adminReducer";
import { register, updateUser } from "../../../redux/actions/user";

const UserManagement = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState("");
  const [currentImageBlob, setCurrentImageBlob] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  const { users, loading, error, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  const deleteHandler = (userId) => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, message, users]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <Image
          width={50}
          src={avatar?.url}
          alt="Profile Image"
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
          <Button type="link" danger onClick={() => deleteHandler(record._id)}>
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
    setAvatar("");
    setCurrentImageBlob(null);
    setEditingUser(null);
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setAvatar(reader.result); // just for preview on screen
      setImage(file); // database ke liye file ka blob
    };
  };

  const handleSave = async () => {
    try {
      const myForm = new FormData();
      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("role", role);
      if (!editingUser) {
        myForm.append("password", password);
      }

      if (image) {
        myForm.append("file", image);
      } else if (currentImageBlob) {
        myForm.append("file", currentImageBlob);
      }

      if (editingUser) {
        dispatch(updateUser(myForm, editingUser._id));
      } else {
        dispatch(register(myForm));
      }

      setIsModalVisible(false);
      form.resetFields();
      setImage("");
      setAvatar("");
      setCurrentImageBlob(null);
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setName(record.name);
    setEmail(record.email);
    setRole(record.role);
    setAvatar(record.avatar.url);

    // Convert the URL to a blob
    fetch(record.avatar.url)
      .then((response) => response.blob())
      .then((blob) => {
        setCurrentImageBlob(blob);
      });

    setIsModalVisible(true);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      role: record.role,
    });
  };

  return (
    <Layout>
      <div className="flex-1 p-5 bg-white">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h2 className="font-bold">ALL USERS</h2>
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
                  { required: true, message: "Please enter the user name" },
                ]}
              >
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter the user's email" },
                ]}
              >
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </Form.Item>
              {!editingUser && (
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
                  <Input.Password
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                  />
                </Form.Item>
              )}
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select
                  onChange={(value) => setRole(value)}
                  placeholder="Select a Role"
                >
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="user">User</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="image"
                label="User Image"
                rules={[
                  {
                    required: !editingUser,
                    message: "Please upload an image!",
                  },
                ]}
              >
                <input
                  id="chooseAvatar"
                  name="chooseAvatar"
                  type="file"
                  accept="image/*"
                  required={!editingUser}
                  onChange={imageHandler}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                />
                {avatar && (
                  <img
                    src={avatar}
                    alt="Profile Image"
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
