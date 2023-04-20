import React, { useEffect } from "react";
import "./Friends.css";
import { useParams } from "react-router-dom";
import {
  Alert,
  Container,
  Form,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";

function MessageList() {
  const [messagesData, setMessagesData] = React.useState({
    status: "",
    message: "",
    messages: [],
    user: "",
    friend: "",
  });
  const [message, setMessage] = React.useState("");

  const urlParams = useParams();

  useEffect(() => {
    const fetchMessages = async (username) => {
      try {
        const response = await fetch(`${urlParams.username}`);
        const data = await response.json();
        setMessagesData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`sendmessage/${urlParams.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: messagesData.user,
          receiver: messagesData.friend,
          message: event.target.content.value,
        }),
      });
      const data = await response.json();
      if (data.success) {
        window.location.reload();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={{ maxWidth: "800px", marginTop: "100px" }}>
      <h2>Messages with {messagesData.friend}</h2>
      <br />
      <div>
        {messagesData.messages.map((single_message) => (
          <Alert
            key={single_message.id}
            variant={
              single_message.sender === messagesData.user ? "primary" : "dark"
            }
            style={{
              textAlign:
                single_message.sender === messagesData.user ? "right" : "left",
              position: "relative",
              left: single_message.sender === messagesData.user ? "50%" : "0",
              borderRadius: "5px",
              padding: "5px",
              marginBottom: "5px",
              maxWidth: "350px",
            }}
          >
            {single_message.sender === messagesData.user ? (
              ""
            ) : (
              <Alert.Heading>{single_message.sender}</Alert.Heading>
            )}
            <p>{single_message.content}</p>
          </Alert>
        ))}
      </div>
      <br />
      <Form onSubmit={sendMessage}>
        <InputGroup className="mb-3">
          <FormControl
            id="content"
            type="text"
            required
            name="content"
            placeholder="Type your message..."
          />
          <Button type="submit" className="account-btn">
            Send
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default MessageList;
