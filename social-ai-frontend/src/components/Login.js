import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../constants";

function Login(props) {
  const { handleLoggedIn } = props;

  const onFinish = (values) => {
    const { username, password } = values;
    const option = {
      method: "POST",
      url: `${BASE_URL}/signin`,
      data: {
        username: username,
        password: password,
      },
      headers: { "Content-Type": "application/json" },
    };
    axios(option)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;
          handleLoggedIn(data);
          message.success("Login succeeded!");
        }
      })
      .catch((err) => {
        console.log("login failed: ", err.message);
        message.error("Login failed!");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Log in to share and discover posts</p>

        <Form name="login" layout="vertical" size="large" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="auth-btn">
              Log in
            </Button>
          </Form.Item>
        </Form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
