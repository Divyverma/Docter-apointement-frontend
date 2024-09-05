import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setDoctors] = useState();

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="text-center">Available Doctors</h1>
        <Row>
          {doctors &&
            doctors.map((doctors) => <DoctorList doctors={doctors} />)}
        </Row>
      </div>
    </Layout>
  );
};

export default HomePage;
