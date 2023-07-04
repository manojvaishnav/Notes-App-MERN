import { React } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import notesImage from "../utills/notesImage.png";
import Loader from "../components/Loader";

const Homepage = () => {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const loginButton = () => {
    navigate("/login");
  };

  const registerButton = () => {
    navigate("/register");
  };

  const notesButton = () => {
    navigate("/notes");
  };

  return (
    <>
      {notesImage ? (
        <>
          <div style={{ padding: "20px" }}>
            <Card style={{ backgroundColor: "#E6E6FA" }}>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} lg={4}>
                    <div style={{ marginBottom: "20px" }}>
                      <Card.Img
                        variant="top"
                        src={notesImage}
                        alt="Notes Image"
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={8}>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <h1 style={{ marginBottom: "20px" }}>
                        Welcome To Notes App
                      </h1>
                      <div style={{ display: "flex", gap: "10px" }}>
                        {loggedIn ? (
                          <>
                            <Button
                              style={{
                                backgroundColor: "#7671DE",
                                border: "1px solid white",
                              }}
                              onClick={notesButton}
                            >
                              Make Notes
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              style={{
                                backgroundColor: "#7671DE",
                                border: "1px solid white",
                              }}
                              size="lg"
                              onClick={loginButton}
                            >
                              Login
                            </Button>
                            <Button
                              style={{
                                backgroundColor: "#7671DE",
                                border: "1px solid white",
                              }}
                              size="lg"
                              onClick={registerButton}
                            >
                              Register
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Homepage;
