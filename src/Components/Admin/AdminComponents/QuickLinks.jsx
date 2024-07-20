import React, { useState, useEffect, Fragment } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { toast } from "react-toastify";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuickLink,
  deleteQucikLink,
  getAllQucikLinks,
  updateQuickLink,
} from "../../../redux/actions/quicklink";
import {
  clearError,
  clearMessage,
} from "../../../redux/reducers/quicklinkReducer";
import Loader from "../../Layout/Loader/Loader";

const { Option } = Select;

const QuickLinks = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [url, setUrl] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingQuickLink, setEditingQuickLink] = useState(null);

  const { quicklinks, loading, error, message } = useSelector(
    (state) => state.quicklink
  );
  const dispatch = useDispatch();

  // console.log(quicklinks);

  const deleteHandler = (sliderId) => {
    dispatch(deleteQucikLink(sliderId));
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

    dispatch(getAllQucikLinks());
  }, [dispatch, error, message]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
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
          <Button type="link" danger onClick={() => deleteHandler(record._id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleAddQuickLink = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingQuickLink(null);
  };

  const handleSave = async () => {
    try {
      const myForm = new FormData();
      myForm.append("title", title);
      myForm.append("language", language);
      myForm.append("url", url);

      console.log(myForm);

      if (editingQuickLink) {
        // Update existing slider image
        dispatch(updateQuickLink(myForm, editingQuickLink._id));
      } else {
        // Add new slider image
        dispatch(createQuickLink(myForm));
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingQuickLink(null);
    } catch (error) {
      console.error("Error saving quick Link:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingQuickLink(record);
    setTitle(record.title);
    setLanguage(record.language);
    setUrl(record.url);

    setIsModalVisible(true);
    form.setFieldsValue({
      title: record.title,
      language: record.language,
      url: record.url,
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h2 className="font-bold">ALL QUICK LINKS</h2>
                <Button type="primary" onClick={handleAddQuickLink}>
                  + Add Quick Link
                </Button>
              </div>
              <Table
                dataSource={quicklinks}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey="_id"
                defaultSortOrder="ascend"
              />

              <Modal
                title={editingQuickLink ? "Edit Quick Link" : "Add Quick Link"}
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
                    name="language"
                    label="Language"
                    rules={[
                      { required: true, message: "Please select a language!" },
                    ]}
                  >
                    <Select
                      placeholder="Select a Language"
                      onChange={(value) => setLanguage(value)}
                    >
                      <Option value="English">English</Option>
                      <Option value="Arabic">Arabic</Option>
                      <Option value="Spanish">Spanish</Option>
                      {/* Add more options as needed */}
                    </Select>
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
                    name="url"
                    label="URL"
                    rules={[
                      { required: true, message: "Please enter the url!" },
                    ]}
                  >
                    <Input
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter Url"
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </>
        )}
      </Fragment>
    </Layout>
  );
};

export default QuickLinks;
