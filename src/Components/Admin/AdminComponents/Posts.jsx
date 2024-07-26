import React, { useState, useEffect, Fragment } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Image,
  Checkbox,
} from "antd";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../../../redux/reducers/postsReducer";
import { toast } from "react-toastify";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../../../redux/actions/posts";
import Loader from "../../Layout/Loader/Loader";

const { Option } = Select;

const Posts = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [enquiryForm, setEnquiryForm] = useState(false);
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [currentImageBlob, setCurrentImageBlob] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPost, setEditingPost] = useState(null);

  const { posts, loading, error, message } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  const deleteHandler = (postId) => {
    dispatch(deletePost(postId));
  };

  // Fetch posts on component mount
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }

    dispatch(getAllPosts());
  }, [dispatch, error, message]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Featured",
      dataIndex: "thumbnailImage",
      key: "thumbnailImage",
      render: (thumbnailImage) => (
        <Image
          width={50}
          src={thumbnailImage?.url}
          alt="Post Image"
          fallback="https://via.placeholder.com/50"
        />
      ),
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

  const handleAddPost = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage(null);
    setAvatar("");
    setCurrentImageBlob(null);
    setEditingPost(null);
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
      myForm.append("title", title);
      myForm.append("category", category);
      myForm.append("author", author);
      myForm.append("content", content);
      myForm.append("metaKeywords", metaKeywords);
      myForm.append("metaDescription", metaDescription);
      myForm.append("enquiryForm", enquiryForm);
      if (image) {
        myForm.append("file", image);
      } else if (currentImageBlob) {
        myForm.append("file", currentImageBlob);
      }

      if (editingPost) {
        // Update existing slider image
        dispatch(updatePost(myForm, editingPost._id));
      } else {
        // Add new slider image
        dispatch(createPost(myForm));
      }

      setIsModalVisible(false);
      form.resetFields();
      setImage(null);
      setAvatar("");
      setCurrentImageBlob(null);
      setEditingPost(null);
    } catch (error) {
      console.error("Error saving Post:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingPost(record);
    setTitle(record.title);
    setCategory(record.category);
    setContent(record.content);
    setAuthor(record.author);
    setMetaKeywords(record.metaKeywords);
    setMetaDescription(record.metaDescription);
    setEnquiryForm(record.enquiryForm);
    setAvatar(record.thumbnailImage.url);

    // Convert the URL to a blob
    fetch(record.thumbnailImage.url)
      .then((response) => response.blob())
      .then((blob) => {
        setCurrentImageBlob(blob);
      });

    setIsModalVisible(true);
    form.setFieldsValue({
      title: record.title,
      category: record.category,
      content: record.content,
      author: record.author,
      metaKeywords: record.metaKeywords,
      metaDescription: record.metaDescription,
      enquiryForm: record.enquiryForm,
    });
  };

  return (
    <Layout>
      <Fragment>
        {loading ? (
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
                  <h2 className="font-bold">ALL POSTS</h2>
                  <Button type="primary" onClick={handleAddPost}>
                    + Add Post
                  </Button>
                </div>
                <Table
                  dataSource={posts}
                  columns={columns}
                  pagination={{ pageSize: 10 }}
                  rowKey="_id"
                  defaultSortOrder="ascend"
                />

                {/* Modal for adding/editing post */}
                <Modal
                  title={editingPost ? "Edit Post" : "Add Post"}
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
                      name="thumbnailImage"
                      label="Post Image"
                      rules={[
                        { required: true, message: "Please upload an image!" },
                      ]}
                    >
                      <input
                        id="chooseAvatar"
                        name="chooseAvatar"
                        type="file"
                        accept="image/*"
                        required={!editingPost}
                        onChange={imageHandler}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      />
                      {avatar && (
                        <img
                          src={avatar}
                          alt="Post Image"
                          style={{
                            marginTop: "10px",
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      )}
                    </Form.Item>

                    <Form.Item
                      name="title"
                      label="Title"
                      rules={[
                        { required: true, message: "Please enter the title!" },
                      ]}
                    >
                      <Input
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title"
                      />
                    </Form.Item>

                    <Form.Item
                      name="category"
                      label="Category"
                      rules={[
                        {
                          required: true,
                          message: "Please select a category!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a Category"
                        onChange={(value) => setCategory(value)}
                      >
                        <Option value="food">Food</Option>
                        <Option value="travel">Travel</Option>
                        <Option value="familyFun">Family & Fun</Option>
                        <Option value="recipe">Recipe</Option>
                        <Option value="events">Events</Option>
                        <Option value="foundation">Foundation</Option>
                        {/* Add more options as needed */}
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
                      <Input
                        placeholder="Enter Author Name"
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      name="content"
                      label="Content"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the content!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="Enter Content"
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      name="metaKeywords"
                      label="Meta Keywords"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the meta keywords!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Meta Keywords"
                        onChange={(e) => setMetaKeywords(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      name="metaDescription"
                      label="Meta Description"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the meta description!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Meta Description"
                        onChange={(e) => setMetaDescription(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item name="enquiryForm" valuePropName="checked">
                      <Checkbox
                        onChange={(e) => setEnquiryForm(e.target.checked)}
                      >
                        Enquiry Form
                      </Checkbox>
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

export default Posts;
