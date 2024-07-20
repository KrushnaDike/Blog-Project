import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Image } from "antd";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
} from "../../../redux/reducers/popupReducer.js";
import { toast } from "react-toastify";
import {
  createPopup,
  deletePopup,
  getAllPopups,
  updatePopup,
} from "../../../redux/actions/popups";
import Loader from "../../Layout/Loader/Loader.jsx";

const { Option } = Select;

const Popups = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [rating, setRating] = useState("");
  const [offer, setOffer] = useState({
    title: "",
    description: "",
    discountPercentage: "",
    couponCode: "",
  });
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [currentImageBlob, setCurrentImageBlob] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPopup, setEditingPopup] = useState(null);

  const { popups, loading, error, message } = useSelector(
    (state) => state.popups
  );
  const dispatch = useDispatch();

  const deleteHandler = (popupId) => {
    dispatch(deletePopup(popupId));
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

    dispatch(getAllPopups());
  }, [dispatch, error, message]);

  console.log(popups);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Content", dataIndex: "content", key: "content" },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
      render: (offer) => offer.discountPercentage + "%" || "N/A",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => rating || "N/A",
    },
    {
      title: "Featured",
      dataIndex: "thumbnailImage",
      key: "thumbnailImage",
      render: (thumbnailImage) => (
        <Image
          width={50}
          src={thumbnailImage?.url}
          alt="Popup Image"
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

  const handleAddPopup = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage(null);
    setAvatar("");
    setCurrentImageBlob(null);
    setEditingPopup(null);
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
      myForm.append("content", content);
      myForm.append("isActive", isActive);
      myForm.append("rating", rating);
      myForm.append("offer", JSON.stringify(offer));
      if (image) {
        myForm.append("file", image);
      } else if (currentImageBlob) {
        myForm.append("file", currentImageBlob);
      }

      if (editingPopup) {
        dispatch(updatePopup(myForm, editingPopup._id));
      } else {
        dispatch(createPopup(myForm));
      }

      setIsModalVisible(false);
      form.resetFields();
      setImage(null);
      setAvatar("");
      setCurrentImageBlob(null);
      setEditingPopup(null);
    } catch (error) {
      console.error("Error saving Popup:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingPopup(record);
    setTitle(record.title);
    setContent(record.content);
    setIsActive(record.isActive);
    setRating(record.rating);
    setAvatar(record.thumbnailImage.url);

    fetch(record.thumbnailImage.url)
      .then((response) => response.blob())
      .then((blob) => {
        setCurrentImageBlob(blob);
      });

    setIsModalVisible(true);
    form.setFieldsValue({
      title: record.title,
      content: record.content,
      isActive: record.isActive,
      rating: record.rating,
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
                <h2 className="font-bold">ALL POPUPS</h2>
                <Button type="primary" onClick={handleAddPopup}>
                  + Add Popup
                </Button>
              </div>
              <Table
                dataSource={popups}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey="_id"
                defaultSortOrder="ascend"
              />

              {/* Modal for adding/editing popup */}
              <Modal
                title={editingPopup ? "Edit Popup" : "Add Popup"}
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
                    label="Popup Image"
                    rules={[
                      { required: true, message: "Please upload an image!" },
                    ]}
                  >
                    <input
                      id="chooseAvatar"
                      name="chooseAvatar"
                      type="file"
                      accept="image/*"
                      required={!editingPopup}
                      onChange={imageHandler}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    />
                    {avatar && (
                      <img
                        src={avatar}
                        alt="Popup Image"
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
                    />
                  </Form.Item>

                  <Form.Item name="isActive" label="Active">
                    <Select
                      defaultValue={isActive}
                      onChange={(value) => setIsActive(value)}
                    >
                      <Option value={true}>Yes</Option>
                      <Option value={false}>No</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="rating" label="Rating">
                    <Select
                      placeholder="Select Rating"
                      onChange={(value) => setRating(value)}
                    >
                      <Option value={1}>1</Option>
                      <Option value={2}>2</Option>
                      <Option value={3}>3</Option>
                      <Option value={4}>4</Option>
                      <Option value={5}>5</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="offer" label="Offer">
                    <Input
                      placeholder="Enter Offer Title"
                      onChange={(e) =>
                        setOffer({ ...offer, title: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Enter Offer Description"
                      onChange={(e) =>
                        setOffer({ ...offer, description: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Discount Percentage"
                      type="number"
                      onChange={(e) =>
                        setOffer({
                          ...offer,
                          discountPercentage: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Coupon Code"
                      onChange={(e) =>
                        setOffer({ ...offer, couponCode: e.target.value })
                      }
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

export default Popups;
