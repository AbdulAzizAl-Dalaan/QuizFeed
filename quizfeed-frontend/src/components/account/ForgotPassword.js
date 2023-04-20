import React from "react";
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
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [message, setMessage] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password2,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Password reset successful");
        navigate("/login");
      } else {
        console.log("Password reset failed");
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
      setMessage(err.name + ": " + err.message);
    }
  };
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
              Reset your <strong>QuizFeed</strong> Password
            </h2>
            <p>Don't worry, we'll get you back to quizzing</p>
          </div>
          <br />
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
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
                Reset Password
              </Button>
            </div>
          </Form>
          < br />
          {message && <Alert variant="danger">{message}</Alert>}
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
