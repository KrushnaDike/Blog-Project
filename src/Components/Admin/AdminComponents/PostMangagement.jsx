import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Image,
  message,
} from "antd";
import axios from "axios";
import ImageUpload from "./ImageUpload"; // Adjust the path if necessary
import Layout from "./Layout";

const PostManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState("");
  const [editingCategory, setEditingCategory] = useState(null); // State to hold the category being edited

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...editingCategory, image }); // Set form fields when editingCategory changes
  }, [editingCategory, image, form]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://blogger-backend-p9yl.onrender.com/api/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const columns = [
    {
      title: "Select",
      key: "select",
      render: () => <input type="checkbox" />,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          width={50}
          src={image}
          alt="Category Image"
          fallback="https://via.placeholder.com/50"
        />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Serial Number", dataIndex: "serialNumber", key: "serialNumber" },
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

  const handleAddCategory = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage("");
    setEditingCategory(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const { name, status, serialNumber } = values;

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

      if (editingCategory) {
        // Update existing category
        const updatedCategory = {
          ...editingCategory,
          name,
          status,
          serialNumber,
          image: imageUrl,
        };

        await axios.put(
          `https://blogger-backend-p9yl.onrender.com/api/categories/${editingCategory._id}`,
          updatedCategory
        );

        setCategories(
          categories.map((category) =>
            category._id === editingCategory._id ? updatedCategory : category
          )
        );
      } else {
        // Add new category
        const newCategoryResponse = await axios.post(
          "https://blogger-backend-p9yl.onrender.com/api/categories",
          {
            name,
            status,
            serialNumber,
            image: imageUrl,
          }
        );

        setCategories([...categories, newCategoryResponse.data]);
      }

      setIsModalVisible(false);
      form.resetFields();
      setImage("");
      setEditingCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://blogger-backend-p9yl.onrender.com/api/categories/${id}`
      );
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
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
            <h2 className="font-bold">ALL CATEGORIES</h2>
            <Button type="primary" onClick={handleAddCategory}>
              + Add Category
            </Button>
          </div>
          <Table dataSource={categories} columns={columns} />

          <Modal
            title={editingCategory ? "Edit Post Category" : "Add Post Category"}
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
                label="Category Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the category name",
                  },
                ]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
              <Form.Item
                name="status"
                label="Category Status"
                rules={[
                  {
                    required: true,
                    message: "Please select the category status",
                  },
                ]}
              >
                <Select placeholder="Select a Status">
                  <Select.Option value="Active">Active</Select.Option>
                  <Select.Option value="Inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="serialNumber"
                label="Category Serial Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter the serial number",
                  },
                ]}
              >
                <Input placeholder="Enter Serial Number" type="number" />
              </Form.Item>
              <Form.Item
                name="image"
                label="Category Image"
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <ImageUpload setImage={setImage} />
                {image && (
                  <img
                    src={image}
                    alt="Category"
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

export default PostManagement;
//correct
