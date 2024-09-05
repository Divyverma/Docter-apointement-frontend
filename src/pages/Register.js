import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/RegisterSyles.css";

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinshHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/register', values);
      dispatch(hideLoading())
      if(res.data.success){
        message.success("Registered successfully")
        navigate('/login')
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message)
      message.error("Something went wrong")
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          className="register-form"
          onFinish={onfinshHandler}
        >
          <h3 className="text-center">Register Here</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <div className="btn-div">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
          <p>
            Already have acount?<Link to="/login"> Login</Link>
          </p>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
