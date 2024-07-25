import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "./Layout";
import { clearError, clearMessage } from "../../../redux/reducers/otherReducer";
import { getAllContacts } from "../../../redux/actions/other";
import { Table } from "antd";
import Loader from "../../Layout/Loader/Loader";

const UserMessages = () => {
  const { contacts, loading, error, message } = useSelector(
    (state) => state.other
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }

    dispatch(getAllContacts());
  }, [dispatch, error, message]);

  // console.log(contacts);

  const columns = [
    {
      title: "Sr.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    { title: "Name", dataIndex: "name", key: "name", width: 200 },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    { title: "Message", dataIndex: "message", key: "message" },
  ];

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
                <h2 className="font-bold">ALL USER MESSAGES</h2>
              </div>
              <Table
                dataSource={contacts}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey="_id"
                defaultSortOrder="ascend"
              />
            </div>
          </>
        )}
      </Fragment>
    </Layout>
  );
};

export default UserMessages;
