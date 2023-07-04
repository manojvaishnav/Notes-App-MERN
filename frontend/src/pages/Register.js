import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUP from "../components/PopUP";
import Loader from "../components/Loader";
// import url from "../backend";

const Register = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  // const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      await axios.post(`api/v1/auth/register`, formData);
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
      }, 3000);
    }
  };
  return (
    <>
      {loader ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="container_div">
            <Card style={{ width: "30rem", padding: "5px" }}>
              {error ? <PopUP variant="danger" message={error} /> : ""}
              <h2>Registration Form</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Form.Group>
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
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
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
                <Form.Group className="mb-3" controlId="formBasicImage">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="profile"
                    accept="image/jpeg, image/png"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                </Form.Group>
                <Button onClick={handleClick} variant="primary" type="submit">
                  Submit
                </Button>
                <hr />
                <Form.Text
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={function () {
                    navigate("/login");
                  }}
                >
                  Login Here
                </Form.Text>
              </Form>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
