import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table } from "antd";

const Users = () => {
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  //table data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render:(text, record)=>(
        <span>{record.isDoctor ? "Yes" : "No"}</span>
      )
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      )
    }
  ];
  

  return (
    <Layout>
      <h3 className="text-center m-3">All Users</h3>
      <Table columns={columns} dataSource={user} />
    </Layout>
  );
};

export default Users;
