import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterSyles.css";


const Login = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();


  const onfinshHandler=async(values)=>{
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values);
      window.location.reload();
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        message.success("Login Success");
        navigate("/");
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something went wrong!")
    }
  }
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          className="register-form"
          onFinish={onfinshHandler}
        >
          <h3 className="text-center">Login Here</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <div className="btn-div">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <p>
            Don't have acount?<Link to="/register"> Register</Link>
          </p>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Login
