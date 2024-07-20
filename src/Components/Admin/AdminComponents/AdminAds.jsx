import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Image } from "antd";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../../../redux/reducers/adReducer.js";
import { toast } from "react-toastify";
import {
  createAd,
  deleteAd,
  getAllAds,
  updateAd,
} from "../../../redux/actions/ads";
import Loader from "../../Layout/Loader/Loader.jsx";

const AdminAds = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [currentImageBlob, setCurrentImageBlob] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingAd, setEditingAd] = useState(null);

  const { ads, loading, error, message } = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  const deleteHandler = (adId) => {
    dispatch(deleteAd(adId));
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

    dispatch(getAllAds());
  }, [dispatch, error, message]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Link", dataIndex: "link", key: "link" },
    {
      title: "Ad Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          width={50}
          src={image?.url}
          alt="Ad Image"
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

  const handleAddAd = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage(null);
    setAvatar("");
    setCurrentImageBlob(null);
    setEditingAd(null);
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setAvatar(reader.result);
      setImage(file);
    };
  };

  const handleSave = async () => {
    try {
      const myForm = new FormData();
      myForm.append("title", title);
      myForm.append("link", link);
      if (image) {
        myForm.append("file", image);
      } else if (currentImageBlob) {
        myForm.append("file", currentImageBlob);
      }

      if (editingAd) {
        dispatch(updateAd(myForm, editingAd._id));
      } else {
        dispatch(createAd(myForm));
      }

      setIsModalVisible(false);
      form.resetFields();
      setImage(null);
      setAvatar("");
      setCurrentImageBlob(null);
      setEditingAd(null);
    } catch (error) {
      console.error("Error saving Ad:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingAd(record);
    setTitle(record.title);
    setLink(record.link);
    setAvatar(record.image.url);

    fetch(record.image.url)
      .then((response) => response.blob())
      .then((blob) => {
        setCurrentImageBlob(blob);
      });

    setIsModalVisible(true);
    form.setFieldsValue({
      title: record.title,
      link: record.link,
    });
  };

  return (
    <Layout>
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
                <h2 className="font-bold">ALL ADS</h2>
                <Button type="primary" onClick={handleAddAd}>
                  + Add Ad
                </Button>
              </div>
              <Table
                dataSource={ads}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey="_id"
                defaultSortOrder="ascend"
              />

              {/* Modal for adding/editing ad */}
              <Modal
                title={editingAd ? "Edit Ad" : "Add Ad"}
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
                    label="Ad Image"
                    rules={[
                      { required: true, message: "Please upload an image!" },
                    ]}
                  >
                    <input
                      id="chooseAvatar"
                      name="chooseAvatar"
                      type="file"
                      accept="image/*"
                      required={!editingAd}
                      onChange={imageHandler}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    />
                    {avatar && (
                      <img
                        src={avatar}
                        alt="Ad Image"
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
                    name="link"
                    label="Link"
                    rules={[
                      { required: true, message: "Please enter the link!" },
                    ]}
                  >
                    <Input
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Enter Link"
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default AdminAds;
