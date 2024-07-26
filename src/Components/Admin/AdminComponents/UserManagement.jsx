import React, { useState, useEffect, Fragment } from "react";
import { Table, Button, Modal, Form, Input, Select, Checkbox } from "antd";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser, getAllUsers } from "../../../redux/actions/admin";
import { clearError, clearMessage } from "../../../redux/reducers/adminReducer";
import { register, updateUser } from "../../../redux/actions/user";
import Loader from "../../Layout/Loader/Loader";

const { Option } = Select;

const UserManagement = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState([]);

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
  }, [dispatch, error, message]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) => permissions.join(", "),
    },
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
    setEditingUser(null);
    setPermissions([]);
  };

  const handleSave = async () => {
    try {
      const userData = {
        name,
        email,
        role,
        permissions,
      };

      if (!editingUser) {
        userData.password = password;
      }

      if (editingUser) {
        dispatch(updateUser(userData, editingUser._id));
      } else {
        dispatch(register(userData));
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
      setPermissions([]);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setName(record.name);
    setEmail(record.email);
    setRole(record.role);
    setPermissions(record.permissions);

    setIsModalVisible(true);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      role: record.role,
      permissions: record.permissions,
    });
  };

  const handleCheckboxChange = (checkedValues) => {
    setPermissions(checkedValues);
  };

  const permissionOptions = [
    "Slider",
    "PostManagement",
    "CustomPages",
    "Footer",
    "UserManagement",
    "UserMessages",
    "UserEnquiries",
  ];

  return (
    <Layout>
      <Fragment>
        {!users ? (
          <Loader />
        ) : (
          <>
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
                        {
                          required: true,
                          message: "Please enter the user name",
                        },
                      ]}
                    >
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the user's email",
                        },
                      ]}
                    >
                      <Input
                        value={email}
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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter Password"
                        />
                      </Form.Item>
                    )}
                    <Form.Item
                      name="role"
                      label="Role"
                      rules={[
                        { required: true, message: "Please select a role" },
                      ]}
                    >
                      <Select
                        value={role}
                        onChange={(value) => setRole(value)}
                        placeholder="Select a Role"
                      >
                        <Option value="admin">Admin</Option>
                        <Option value="user">User</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="permissions"
                      label="Permissions"
                      rules={[
                        {
                          required: true,
                          message: "Please select at least one permission",
                        },
                      ]}
                    >
                      <Checkbox.Group
                        options={permissionOptions}
                        value={permissions}
                        onChange={handleCheckboxChange}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
          </>
        )}
      </Fragment>
    </Layout>
  );
};

export default UserManagement;
