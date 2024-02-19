import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../apicalls/users";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await RegisterUser(formData);
      if (response.success) {
        console.log("Login success");
        navigate("/login");
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="d-flex flex-column align-items-center"
        style={{ maxWidth: "500px", maxHeight: "50vh" }}
      >
        <h1>Welcome to our Website</h1>
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              // Pass the handleChange function to the onChange event
              onChange={handleChange}
              name="name" // Add the name attribute
              value={formData.name} // Set the value attribute
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              name="email" // Add the name attribute
              value={formData.email} // Set the value attribute
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password" // Add the name attribute
              value={formData.password} // Set the value attribute
              required
            />
          </Form.Group>

          <div className="d-flex flex-column justify-content-center">
            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
            <Link to="/login" className="text-primary mt-3">
              Already have a account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
