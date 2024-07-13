import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Layout from "./Layout";

const { Option } = Select;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialData, setInitialData] = useState(null); // State to hold initial data for editing
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // State to hold Cloudinary image URL

  // Fetch posts on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://blogger-backend-p9yl.onrender.com/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleAddPost = () => {
    setIsModalVisible(true);
    setInitialData(null); // Reset initialData when adding a new post
    form.resetFields(); // Reset form fields
    setImageUrl(null); // Reset imageUrl state
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setInitialData(null); // Reset initialData on modal close
    form.resetFields(); // Reset form fields
    setImageUrl(null); // Reset imageUrl state
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://blogger-backend-p9yl.onrender.com/api/posts/${id}`)
      .then((response) => {
        console.log("Post deleted:", response.data);
        fetchData(); // Refresh posts after delete
        message.success("Post deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        message.error("Failed to delete post. Please try again.");
      });
  };

  const handleEdit = (record) => {
    console.log("Edit post:", record);
    setIsModalVisible(true);
    setInitialData(record); // Set initialData for editing
    form.setFieldsValue(record); // Set form fields with initialData
    setImageUrl(record.thumbnailImage); // Set imageUrl state with current thumbnailImage
  };

  // Handle form submission for add/update
  const onFinish = (values) => {
    setLoading(true);
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "thumbnailImage" && values[key]) {
        formData.append("file", values[key].originFileObj);
      } else {
        formData.append(key, values[key]);
      }
    });

    const apiUrl = initialData
      ? `https://blogger-backend-p9yl.onrender.com/api/posts/${initialData._id}`
      : "https://blogger-backend-p9yl.onrender.com/api/posts";
    const axiosMethod = initialData ? axios.put : axios.post;

    axiosMethod(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Post saved:", response.data);
        fetchData(); // Refresh posts after save
        message.success("Post saved successfully!");
        setLoading(false);
        form.resetFields();
        setIsModalVisible(false); // Close modal on save
      })
      .catch((error) => {
        console.error("Error saving post:", error);
        message.error("Failed to save post. Please try again.");
        setLoading(false);
      });
  };

  // Handle file upload validation
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Only JPG/PNG images are allowed!");
    }
    return isJpgOrPng;
  };

  // Custom upload button for Ant Design Upload component
  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Featured",
      dataIndex: "thumbnailImage",
      key: "thumbnailImage",
      render: (image) => (
        <img
          src={image}
          alt="featured"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
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

  // Add selection column with checkboxes
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("selectedRowKeys:", selectedRowKeys);
      console.log("selectedRows:", selectedRows);
    },
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
            <h2 className="font-bold">ALL POSTS</h2>
            <Button type="primary" onClick={handleAddPost}>
              + Add Post
            </Button>
          </div>
          <Table
            dataSource={posts}
            columns={columns}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            pagination={{ pageSize: 10 }}
          />

          {/* Modal for adding/editing post */}
          <Modal
            title={initialData ? "Edit Post" : "Add Post"}
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
                name="thumbnailImage"
                label="Thumbnail Image"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
                rules={[
                  {
                    required: true,
                    message: "Please upload a thumbnail image!",
                  },
                ]}
              >
                <Upload
                  beforeUpload={beforeUpload}
                  accept=".jpg,.png,.jpeg,.svg"
                  maxCount={1}
                  listType="picture-card"
                  fileList={initialData ? [{ uid: "-1", url: imageUrl }] : []}
                >
                  {uploadButton}
                </Upload>
              </Form.Item>

              <Form.Item
                name="serialNumber"
                label="Serial Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter the serial number!",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter Serial Number" />
              </Form.Item>

              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter the title!" }]}
              >
                <Input placeholder="Enter Title" />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select placeholder="Select a Category">
                  <Option value="pizza">Pizza</Option>
                  <Option value="cakes">Cakes</Option>
                  <Option value="burger">Burger</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="author"
                label="Author"
                rules={[
                  {
                    required: true,
                    message: "Please enter the author name!",
                  },
                ]}
              >
                <Input placeholder="Enter Author Name" />
              </Form.Item>

              <Form.Item
                name="content"
                label="Content"
                rules={[
                  { required: true, message: "Please enter the content!" },
                ]}
              >
                <Input.TextArea rows={6} placeholder="Enter Content" />
              </Form.Item>

              <Form.Item name="metaKeywords" label="Meta Keywords">
                <Input placeholder="Enter Meta Keywords" />
              </Form.Item>

              <Form.Item name="metaDescription" label="Meta Description">
                <Input.TextArea rows={4} placeholder="Enter Meta Description" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Posts;
//correct
