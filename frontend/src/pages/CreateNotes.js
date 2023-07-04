import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import PopUp from "../components/PopUP";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
// import url from "../backend";

const CreateNotes = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const noteSave = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      await axios.post(`/api/v1/notes`, { title, content, tags });
      navigate("/notes");
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
  };

  const cancelNote = (event) => {
    event.preventDefault();
    navigate("/notes");
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="container_div">
            <Card style={{ width: "30rem", padding: "5px" }}>
              {error ? <PopUp variant="danger" message={error} /> : ""}
              <h2>Create A Notes</h2>
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
                </Form.Group>
                <Button onClick={noteSave} variant="primary" type="submit">
                  Save
                </Button>
                <Button onClick={cancelNote} variant="danger" type="submit">
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

export default CreateNotes;
