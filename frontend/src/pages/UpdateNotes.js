import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import PopUp from "../components/PopUP";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
// import url from "../backend";

const UpdateNotes = () => {
  const navigate = useNavigate();

  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const queryParams = new URLSearchParams(window.location.search);
  let id = queryParams.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const updateNote = async (id) => {
    try {
      setLoader(true);
      await axios.put(`/api/v1/notes/${id}`, { title, content, tags });
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

  const getDetails = useCallback(async () => {
    try {
      setLoader(true);
      const resp = await axios.get(`/api/v1/notes/${id}`);
      setTitle(resp.data.message[0].title);
      setContent(resp.data.message[0].content);
      setTags(resp.data.message[0].tags);
      setLoader(false);
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
  }, [id]);

  const updateCancel = (event) => {
    event.preventDefault();
    setLoader(true);
    navigate("/notes");
    setLoader(false);
  };

  useEffect(() => {
    if (loggedIn) {
      getDetails();
    } else {
      navigate("/login");
    }
  }, [getDetails, navigate, loggedIn]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="container_div">
            <Card style={{ width: "30rem", padding: "5px" }}>
              {error ? <PopUp variant="danger" message={error} /> : ""}
              <h2>Update Notes</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tags"
                    value={tags}
                    onChange={(event) => {
                      const newArray = event.target.value.split(/[\s,]+/);
                      setTags(newArray);
                    }}
                  />
                  <Form.Text className="text-muted">
                    separate with comma(,)
                  </Form.Text>
                </Form.Group>
                <Button
                  onClick={() => {
                    updateNote(id);
                  }}
                  variant="primary"
                >
                  Update
                </Button>
                <Button onClick={updateCancel} variant="danger">
                  Cancel
                </Button>
              </Form>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateNotes;
