import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopUp from "./PopUP";
import Loader from "./Loader";
// import url from "../backend";

function NavigationBar() {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const [loader, setLoader] = useState(false);

  const logout = async () => {
    try {
      setLoader(true);
      await axios.post(`/api/v1/auth/logout`);
      localStorage.removeItem("authToken");
      setLoader(false);
      setName("");
      navigate("/login");
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

  const setLogin = async () => {
    await axios
      .get(`/api/v1/valid`)
      .then((resp) => {
        if (resp.data.success) {
          const text = resp.data.message;
          const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
          setName(capitalizedText);
          localStorage.setItem("authToken", true);
        } else {
          localStorage.setItem("authToken", false);
        }
      })
      .catch((err) => {
        localStorage.setItem("authToken", false);
      });
  };

  useEffect(() => {
    setLogin();
  }, [loggedIn, navigate]);

  return (
    <>
      {loader ? (
        <>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand as={Link} to={"/"}>
                Notes App
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  {loggedIn ? (
                    <>
                      <NavDropdown
                        title={`Welcome ${name}`}
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item as={Link} to={"/profile"}>
                          Edit Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <Nav.Link as={Link} to={"/register"}>
                        Register
                      </Nav.Link>
                      <Nav.Link eventKey={2} as={Link} to={"/login"}>
                        Login
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Loader />
        </>
      ) : (
        <>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand as={Link} to={"/"}>
                Notes App
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  {loggedIn ? (
                    <>
                      <NavDropdown
                        title={`Welcome ${name}`}
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item as={Link} to={"/profile"}>
                          Edit Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <Nav.Link as={Link} to={"/register"}>
                        Register
                      </Nav.Link>
                      <Nav.Link eventKey={2} as={Link} to={"/login"}>
                        Login
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {error ? <PopUp variant="danger" message={error} /> : ""}
        </>
      )}
    </>
  );
}

export default NavigationBar;
