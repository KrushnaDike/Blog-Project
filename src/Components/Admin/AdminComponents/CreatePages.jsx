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
import { useDispatch, useSelector } from "react-redux";
import {
  createPage,
  deletePage,
  getAllPages,
  updatePage,
} from "../../../redux/actions/pages";
import { clearError, clearMessage } from "../../../redux/reducers/pagesReducer";
import { toast } from "react-toastify";
import Loader from "../../Layout/Loader/Loader";

const { Option } = Select;

const CreatePages = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState("");
  const [cloneForOtherLanguage, setCloneForOtherLanguage] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPage, setEditingPage] = useState(null);

  const { pages, loading, error, message } = useSelector(
    (state) => state.pages
  );
  const dispatch = useDispatch();

  const deleteHandler = (pageId) => {
    dispatch(deletePage(pageId));
  };

  // Fetch pages on component mount
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }

    dispatch(getAllPages());
  }, [dispatch, error, message]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
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
          <Button type="link" danger onClick={() => deleteHandler(record._id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleAddPage = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingPage(null);
  };

  const handleSave = async () => {
    try {
      const myForm = new FormData();
      myForm.append("title", title);
      myForm.append("content", content);
      myForm.append("metaKeywords", metaKeywords);
      myForm.append("metaDescription", metaDescription);
      myForm.append("status", status);
      myForm.append("cloneForOtherLanguage", cloneForOtherLanguage);

      if (editingPage) {
        // Update existing page
        dispatch(updatePage(myForm, editingPage._id));
      } else {
        // Add new page
        dispatch(createPage(myForm));
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingPage(null);
    } catch (error) {
      console.error("Error saving Page:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingPage(record);
    setTitle(record.title);
    setContent(record.content);
    setMetaKeywords(record.metaKeywords);
    setMetaDescription(record.metaDescription);
    setStatus(record.status);
    setCloneForOtherLanguage(record.cloneForOtherLanguage);

    setIsModalVisible(true);
    form.setFieldsValue({
      title: record.title,
      content: record.content,
      metaKeywords: record.metaKeywords,
      metaDescription: record.metaDescription,
      status: record.status,
      cloneForOtherLanguage: record.cloneForOtherLanguage,
    });
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
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
              title={editingPage ? "Edit Page" : "Add Page"}
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
                  name="title"
                  label="Title"
                  rules={[
                    { required: true, message: "Please enter the title!" },
                  ]}
                >
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                    value={title}
                  />
                </Form.Item>

                <Form.Item
                  name="content"
                  label="Content"
                  rules={[
                    { required: true, message: "Please enter the content!" },
                  ]}
                >
                  <Input.TextArea
                    rows={6}
                    placeholder="Enter Content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  />
                </Form.Item>

                <Form.Item name="metaKeywords" label="Meta Keywords">
                  <Input
                    placeholder="Enter Meta Keywords"
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    value={metaKeywords}
                  />
                </Form.Item>

                <Form.Item name="metaDescription" label="Meta Description">
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter Meta Description"
                    onChange={(e) => setMetaDescription(e.target.value)}
                    value={metaDescription}
                  />
                </Form.Item>

                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    { required: true, message: "Please select the status!" },
                  ]}
                >
                  <Select
                    placeholder="Select Status"
                    onChange={(value) => setStatus(value)}
                    value={status}
                  >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="cloneForOtherLanguage"
                  valuePropName="checked"
                  label="Clone for Other Language"
                >
                  <Checkbox
                    onChange={(e) => setCloneForOtherLanguage(e.target.checked)}
                    checked={cloneForOtherLanguage}
                  >
                    Clone for عربي or other language
                  </Checkbox>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CreatePages;
