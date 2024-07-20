import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Image } from "antd";
import { toast } from "react-toastify";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  createSlider,
  deleteSliderImage,
  getAllSliderImages,
  updateSlider,
} from "../../../redux/actions/slider";
import {
  clearError,
  clearMessage,
} from "../../../redux/reducers/sliderReducer";
import Loader from "../../Layout/Loader/Loader";

const Slider = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null); // change initial state to null
  const [avatar, setAvatar] = useState(""); // preview of image
  const [currentImageBlob, setCurrentImageBlob] = useState(null); // store current image blob

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingSlider, setEditingSlider] = useState(null);

  const { sliders, loading, error, message } = useSelector(
    (state) => state.slider
  );
  const dispatch = useDispatch();

  const deleteHandler = (sliderId) => {
    dispatch(deleteSliderImage(sliderId));
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

    dispatch(getAllSliderImages());
  }, [dispatch, error, message]);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    { title: "Title", dataIndex: "title", key: "title", width: 200 },
    {
      title: "Image",
      dataIndex: "thumbnailImage",
      key: "thumbnailImage",
      render: (thumbnailImage) => (
        <Image
          width={50}
          src={thumbnailImage?.url}
          alt="Slider Image"
          fallback="https://via.placeholder.com/50"
        />
      ),
    },
    {
      title: "URL",
      dataIndex: "thumbnailImage",
      key: "thumbnailImage",
      render: (thumbnailImage) => thumbnailImage.url,
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

  const handleAddSliderImage = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage(null);
    setAvatar("");
    setCurrentImageBlob(null);
    setEditingSlider(null);
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
      if (image) {
        myForm.append("file", image);
      } else if (currentImageBlob) {
        myForm.append("file", currentImageBlob);
      }

      if (editingSlider) {
        // Update existing slider image
        dispatch(updateSlider(myForm, editingSlider._id));
      } else {
        // Add new slider image
        dispatch(createSlider(myForm));
      }

      setIsModalVisible(false);
      form.resetFields();
      setImage(null);
      setAvatar("");
      setCurrentImageBlob(null);
      setEditingSlider(null);
    } catch (error) {
      console.error("Error saving slider image:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingSlider(record);
    setTitle(record.title);
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
                <h2 className="font-bold">
                  ALL SLIDING IMAGES{" "}
                  <span>(1920x1080 pixels imagaes are prefered)</span>
                </h2>
                <Button type="primary" onClick={handleAddSliderImage}>
                  + Add Sliding Image
                </Button>
              </div>
              <Table
                dataSource={sliders}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey="_id"
                defaultSortOrder="ascend"
              />

              <Modal
                title={editingSlider ? "Edit Slider Image" : "Add Slider Image"}
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
                    />
                  </Form.Item>
                  <Form.Item
                    name="image"
                    label="Slider Image"
                    rules={[
                      { required: true, message: "Please upload an image!" },
                    ]}
                  >
                    <input
                      id="chooseAvatar"
                      name="chooseAvatar"
                      type="file"
                      accept="image/*"
                      required={!editingSlider}
                      onChange={imageHandler}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    />
                    {avatar && (
                      <img
                        src={avatar}
                        alt="Slider Image"
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
        </>
      )}
    </Layout>
  );
};

export default Slider;
