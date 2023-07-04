import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUP from "../components/PopUP";
import Loader from "../components/Loader";
// import url from "../backend";

const Profile = () => {
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [view, setView] = useState("");
  const [loader, setLoader] = useState(false);

  const convertImageToBase64 = (event) => {
    const file = event.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const removeBase64Prefix = (base64String) => {
          const prefixIndex = base64String.indexOf(",") + 1;
          return base64String.substring(prefixIndex);
        };

        const base64String = reader.result;
        const base64Data = removeBase64Prefix(base64String);

        setView(base64Data);
      };

      reader.readAsDataURL(file);
    }
  };

  const updateCancel = (event) => {
    navigate("/notes");
  };

  const updateProfile = async () => {
    try {
      setLoader(true);
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("name", name);
      formData.append("email", email);
      await axios
        .put(`/api/v1/user`, formData)
        .then(() => {
          localStorage.setItem("profileUpdate", true);
          navigate("/notes");
          // setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          if (err.response.data.message) {
            setError(err.response.data.message);
          } else if (err.message) {
            setError(err.message);
          }
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const getDetails = async () => {
    try {
      setLoader(true);
      const resp = await axios.get(`/api/v1/profile`);
      setName(resp.data.message.name);
      setEmail(resp.data.message.email);
      const imageUrl = resp.data.message.image;
      setView(imageUrl);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      if (err.response) {
        setError(err.response);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  useEffect(() => {
    if (loggedIn) {
      getDetails();
    } else {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div style={{ padding: "20px" }}>
            <Card>
              {error ? <PopUP variant="danger" message={error} /> : ""}
              <Card.Header
                style={{
                  textAlign: "center",
                  color: "#24a0ed",
                  fontWeight: "bold",
                }}
              >
                Update Profile
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} lg={4}>
                    {view && (
                      <div style={{ marginBottom: "20px" }}>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64,${view}`}
                          alt="Profile Image"
                        />
                      </div>
                    )}
                  </Col>
                  <Col xs={12} md={6} lg={8}>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
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
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                          type="file"
                          placeholder="profile"
                          accept="image/jpeg, image/png"
                          onChange={convertImageToBase64}
                        />
                      </Form.Group>
                      <Button onClick={updateProfile} variant="primary">
                        Submit
                      </Button>
                      <Button onClick={updateCancel} variant="danger">
                        Cancel
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
