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
  // Initialize messagesData state variable
  const [messagesData, setMessagesData] = React.useState({
    status: "",
    message: "",
    messages: [],
    user: "",
    friend: "",
  });

  // Initialize message and errorMessage state variables
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Get username from URL
  const urlParams = useParams();

  // Fetch messages from backend server
  useEffect(() => {
    // Obtains messages between current logged in user and user in URL
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

  // Send message to backend server
  const sendMessage = async (event) => {
    event.preventDefault();

    try {
      // Send message to backend server with the url user and the message content
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
        // if the response is successful, add the new message to the messagesData state variable
        setMessagesData((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, data.newMessage],
        }));

        // Reset the message and errorMessage state variables
        setMessage("");
      } else {
        // if the response is unsuccessful, set the errorMessage state variable
        setErrorMessage(data.message);
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
        {messagesData.messages.length === 0 && <h5 style={{textAlign: 'center'}}>Be the first to send something nice!</h5>}
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
            value={message} // Set the value of the input to the message state variable
            onChange={(event) => setMessage(event.target.value)} // Set the message state variable to the value of the input
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
