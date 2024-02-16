import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("register form submit");
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="d-flex flex-column align-items-center"
        style={{ maxWidth: "500px", maxHeight: "50vh" }}
      >
        <h1>Login In</h1>
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <div className="d-flex flex-column justify-content-center">
            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
            <Link to="/register" className="text-primary mt-3">
              Don't have an account? Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
