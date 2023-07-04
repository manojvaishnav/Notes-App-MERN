import React, { useEffect, useState, useCallback } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { BsFillPlusSquareFill } from "react-icons/bs";
import PopUP from "../components/PopUP";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
// import url from "../backend";

const Notes = () => {
  const navigate = useNavigate();
  const updateProfile = JSON.parse(localStorage.getItem("profileUpdate"));
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);

  const getNotes = useCallback(async () => {
    try {
      setLoader(true);
      await axios
        .get(`/api/v1/notes`)
        .then((resp) => {
          setNotes(resp.data.message);
          setLoader(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoader(false);
          navigate("/login");
        });
    } catch (err) {
      setLoader(false);
      if (err.response) {
        setError(err.response);
        navigate("/login");
      } else if (err.message) {
        setError(err.message);
        navigate("/login");
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      setLoader(true);
      await axios.delete(`/api/v1/notes/${id}`);
      getNotes();
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

  const handleUpdate = (id) => {
    try {
      navigate(`/updatenotes?id=${id}`);
    } catch (err) {
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

  const profileUpdate = () => {
    localStorage.setItem("profileUpdate", false);
  };

  useEffect(() => {
    getNotes();
    if (updateProfile) {
      setSuccess("Profile Update Successfully");
    }
    setTimeout(() => {
      profileUpdate();
      setSuccess("");
    }, 3000);
  }, [getNotes]);

  return (
    <>
      {loggedIn ? (
        <>
          {loader ? (
            <Loader />
          ) : (
            <>
              <div className="notes_div">
                {error ? <PopUP variant="danger" message={error} /> : ""}
                {success ? <PopUP variant="success" message={success} /> : ""}
                <>
                  <div className="welcome_div">
                    <h2>Welcome</h2>
                    <Button
                      className="centered_button"
                      onClick={() => {
                        navigate("/createnotes");
                      }}
                    >
                      <BsFillPlusSquareFill
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginRight: "5px",
                        }}
                      />
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          textAlign: "center",
                        }}
                      >
                        Create Note
                      </h3>
                    </Button>
                  </div>
                  <hr />
                  <Accordion>
                    {notes.map((item, index) => (
                      <Accordion.Item key={item._id} eventKey={index}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>{item.content}</Accordion.Body>
                        <Accordion.Body style={{ color: "green" }}>
                          Tags:{" "}
                          {item.tags.map((value) => {
                            return value + ", ";
                          })}
                        </Accordion.Body>
                        <Accordion.Body>
                          <Button
                            onClick={() => {
                              handleUpdate(item._id);
                            }}
                            variant="primary"
                          >
                            Update
                          </Button>
                          <Button
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </>
              </div>
            </>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Notes;
