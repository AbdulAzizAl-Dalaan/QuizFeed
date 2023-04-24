import React from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
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
// import Auth variable

function Login() {
  // defining stateful value variables and functions to update them
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState(null);

  // defining a function to navigate to a different page
  const navigate = useNavigate();

  // defining a function to handle the form submission
  const handleLogin = async (event) => {
    // prevent the default form submission behavior
    event.preventDefault();

    // send a POST request to the server
    try {
      // send a POST request to the server
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // get the response data
      const data = await response.json();

      // if the login was successful, navigate to the home page
      if (data.success) {
        console.log("Login successful");
        setMessage(data.message);
        navigate("/trendingQuizzes");
      } // if the login failed, display an error message
      else {
        console.log("Login failed");
        setMessage(data.message);
      }
    } catch (
      err // if an error occurred, display an error message
    ) {
      console.log(err);
      setMessage(err.name + ": " + err.message);
    }
  };
  
  // display the login form
  return (
    <Container className="container-margin">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h2>
              Welcome to <strong>QuizFeed</strong>
            </h2>
            <p>Login to start quizzing</p>
          </div>
          <br />
          <Form onSubmit={handleLogin}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </InputGroup>
            <br />
            <div className="d-grid">
              <Button className="account-btn" type="submit">
                Login
              </Button>
            </div>
          </Form>
          {message && (
            <Alert variant="danger" className="mt-3">
              {message}
            </Alert>
          )}
          <Link to="/register">
            <Button variant="link" className="mt-2">
              Create an account
            </Button>
          </Link>
          <Link to="/forgotpassword">
            <Button variant="link" className="mt-2">
              Forgot password?
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
