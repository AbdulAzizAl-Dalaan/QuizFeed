import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignature,
  faUser,
  faLock,
  faEnvelope,
  faPhone,
  faCamera,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

function Settings() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [bio, setBio] = useState("");
  const [profile_pic, setProfile_pic] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/settings");
        const data = await response.json();

        if (data.success) {
          setFirstname(data.user.firstname);
          setLastname(data.user.lastname);
          setUsername(data.user.username);
          setEmail(data.user.email);
          setNumber(data.user.number);
          setBio(data.user.bio)
          setProfile_pic(data.user.profile_pic)
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setMessage(err.name + ": " + err.message);
      }
    };

    fetchUserInfo();
  }, []);

  const saveChanges = async (event) => {
    event.preventDefault();

    if (password !== password2) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          bio, 
          profile_pic,
          number,
          password,
          password2,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setTimeout(() => {
          navigate("/logout");
        }, 3000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.name + ": " + err.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/deleteaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
          setMessage(data.message);
          navigate("/logout");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.name + ": " + error.message);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container className="container-margin">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h2>
              Change your <strong>QuizFeed</strong> Account
            </h2>
            <p>quiz as someone else</p>
          </div>
          <Form onSubmit={saveChanges}>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSignature} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faEnvelope} />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faPhone} />
              </InputGroup.Text>
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faBook} />
              </InputGroup.Text>
              <Form.Control
                as='textarea'
                rows={5}
                placeholder="Biography"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faCamera} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Profile Picture enter as hosted image (e.g., https://i.imgur.com/V4RclNb.png )"
                value={profile_pic}
                onChange={(event) => setProfile_pic(event.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
              />
            </InputGroup>
            <div className="d-grid">
              <Button className="account-btn" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
          <br />
          <div className="d-grid">
            <Button variant="danger" onClick={handleShow}>
              Delete Account
            </Button>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <br />
          {message && message === "Account updated, Redirecting back to login" && <Alert variant="success">{message}</Alert>}
          {message && message !== "Account updated, Redirecting back to login" && <Alert variant="danger">{message}</Alert>}
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;
