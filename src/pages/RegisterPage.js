// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true); // Show loading state
    try {
      // Send POST request to auth/register endpoint
      const response = await axios.post('/auth/register', {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        isAdmin : false,
      });

      if (response.status === 201) { //created response status
        message.success('Registration successful! Redirecting to login...');
        navigate('/login'); // Redirect to login page
      } else {
        message.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error('Failed to register. Please check the details and try again.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Register" style={{ width: 400 }}>
        <Form name="register-form" onFinish={onFinish} layout="vertical">
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
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input placeholder="Enter your last name" />
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
              Register
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span>Already have an account? </span>
          <Link to="/login">Login here</Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
