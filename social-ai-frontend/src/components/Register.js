import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

import { BASE_URL } from "../constants";

function Register(props) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;
    const opt = {
      method: "POST",
      url: `${BASE_URL}/signup`,
      data: {
        username: username,
        password: password,
      },
      headers: { "content-type": "application/json" },
    };

    axios(opt)
      .then((response) => {
        if (response.status === 200) {
          message.success("Registration succeeded!");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("register failed: ", error.message);
        message.error("Registration failed!");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create an account</h2>
        <p className="auth-subtitle">Join WildCats Social AI</p>

        <Form
          form={form}
          name="register"
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="Username"
            extra="Lowercase letters and numbers only"
            rules={[
              { required: true, message: "Please input your username!" },
              {
                pattern: /^[a-z0-9]+$/,
                message: "Only lowercase letters and numbers are allowed",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            hasFeedback
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="auth-btn">
              Register
            </Button>
          </Form.Item>
        </Form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
