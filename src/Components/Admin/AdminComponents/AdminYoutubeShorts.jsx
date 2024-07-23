import React, { useState, useEffect, Fragment } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { toast } from "react-toastify";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  createYoutubeShort,
  deleteYoutubeShort,
  getAllYoutubeShorts,
  updateYoutubeShort,
} from "../../../redux/actions/shorts";
import {
  clearError,
  clearMessage,
} from "../../../redux/reducers/shortsReducer";
import Loader from "../../Layout/Loader/Loader";

const YoutubeShorts = () => {
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingYoutubeShort, setEditingYoutubeShort] = useState(null);

  const { youtubeShorts, loading, error, message } = useSelector(
    (state) => state.shorts
  );
  const dispatch = useDispatch();

  const deleteHandler = (youtubeShortId) => {
    dispatch(deleteYoutubeShort(youtubeShortId));
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

    dispatch(getAllYoutubeShorts());
  }, [dispatch, error, message]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
    }, // Increase column width to 200px
    { title: "Video URL", dataIndex: "videoUrl", key: "videoUrl" },
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

  const handleAddYoutubeShort = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingYoutubeShort(null);
  };

  const handleSave = async () => {
    try {
      const myForm = new FormData();
      myForm.append("description", description);
      myForm.append("videoUrl", videoUrl);

      if (editingYoutubeShort) {
        // Update existing youtube short
        dispatch(updateYoutubeShort(myForm, editingYoutubeShort._id));
      } else {
        // Add new youtube short
        dispatch(createYoutubeShort(myForm));
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingYoutubeShort(null);
    } catch (error) {
      console.error("Error saving youtube short:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingYoutubeShort(record);
    setDescription(record.description);
    setVideoUrl(record.videoUrl);

    setIsModalVisible(true);
    form.setFieldsValue({
      description: record.description,
      videoUrl: record.videoUrl,
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
                <h2 className="font-bold">ALL YOUTUBE SHORTS</h2>
                <Button type="primary" onClick={handleAddYoutubeShort}>
                  + Add Youtube Short
                </Button>
              </div>
              <Table
                dataSource={youtubeShorts}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey="_id"
                defaultSortOrder="ascend"
              />

              <Modal
                title={
                  editingYoutubeShort
                    ? "Edit Youtube Short"
                    : "Add Youtube Short"
                }
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
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the description!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter Description"
                    />
                  </Form.Item>
                  <Form.Item
                    name="videoUrl"
                    label="Video URL"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the video URL!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Enter Video URL"
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

export default YoutubeShorts;
