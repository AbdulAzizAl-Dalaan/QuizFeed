import React from "react";
import { useNavigate } from "react-router-dom";
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
import {
  faSignature,
  faUser,
  faLock,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function Register() {
  // obtaining the values from the form fields and storing them in state
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [message, setMessage] = React.useState("");

  // useNavigate hook to redirect to the login page after successful registration
  const navigate = useNavigate();

  // function to handle the registration form submission
  const handleSubmit = async (event) => {
    // prevent the default form submission behavior
    event.preventDefault();

    // send a POST request to the server
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          password,
          email,
          number,
        }),
      });

      // convert the response to JSON
      const data = await response.json();

      // if the registration was successful, redirect to the login page
      if (data.success) {
        console.log("Registration successful");
        navigate("/login");
      } // otherwise, display the error message
      else {
        console.log("Registration failed");
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="container-margin">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
            <div style={{
                textAlign: "center",
            }}>
                <h2>Register your <strong>QuizFeed</strong> Account</h2>
                <p>Join to start quizzing</p>

            </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSignature} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    required
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
                    required
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
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faEnvelope} />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faPhone} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                required
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </InputGroup>
            <div className="d-grid">
              <Button className="account-btn" type="submit">
                Register
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

export default Register;