// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = ({onLogin}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const onFinish = async (values) => {
    setLoading(true); // Show loading state
    try {
      // Send POST request to auth/login endpoint
      const response = await axios.post('/auth/login', {
        email: values.email,
        password: values.password,
      });

      // Check response (assuming the token is returned)
      if (response.status === 200) {
        // Save the token in sessionStorage or localStorage
        localStorage.setItem('token', response.data);
        // Show success message
        message.success('Login successful! Redirecting...');
        onLogin(response.data)
        navigate('/');
      } else {
        message.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Invalid email or password. Please try again.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Login" style={{ width: 350 }}>
        <Form name="login-form" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span>Don't have an account? </span>
          <Link to="/register">Register now</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
