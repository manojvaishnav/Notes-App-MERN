import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUP from "../components/PopUP";
import Loader from "../components/Loader";
// import url from "../backend";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      await axios.post(`/api/v1/auth/login`, { email, password });
      localStorage.setItem("authToken", true);
      navigate("/notes");
      // setLoader(false);
    } catch (err) {
      setLoader(false);
      if (err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="container_div">
            <Card style={{ width: "30rem", padding: "5px" }}>
              {error ? <PopUP variant="danger" message={error} /> : ""}
              <h2>Login Form</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Form.Group>
                <Button onClick={handleLogin} variant="primary" type="submit">
                  Submit
                </Button>
                <hr />
                <Form.Text
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={function () {
                    navigate("/register");
                  }}
                >
                  Register Here
                </Form.Text>
              </Form>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
