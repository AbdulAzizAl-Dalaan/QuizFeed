import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import "./Friends.css";

function FriendsList() {
  const [friendsData, setFriendsData] = React.useState({
    friends_list: [],
    pending_requests_list: [],
    my_friend_requests: [],
  });
  const [message, setMessage] = React.useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/friends");
        const data = await response.json();
        setFriendsData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const updateFriendLists = async () => {
    try {
      const response = await fetch("/friends");
      const data = await response.json();
      setFriendsData(data);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const acceptFriend = async (username) => {
    try {
      const response = await fetch(`/friends/acceptfriend/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });
      const data = await response.json();
      if (data.success) {
        updateFriendLists();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFriend = async (username) => {
    try {
      const response = await fetch(`/friends/removefriend/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });
      const data = await response.json();
      if (data.success) {
        updateFriendLists();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendFriendRequest = async (e) => {
    e.preventDefault();
    const friend_request = e.target.friend_request.value;
    try {
      const response = await fetch(
        `/friends/sendfriendrequest/${friend_request}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            friend_request,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        updateFriendLists();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProfile = async (username) => {
    try {
      navigate(`/profile/${username}`);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessage = async (username) => {
    try {
      navigate(`message/${username}`);
    } catch (err) {
      console.log(err);
    }
  };
  // #344966
  return (
    <>
      <Container className="container-margin">
        <Row>
          <Col xs={12} md={6}>
            <Card className="mb-3 Table">
              <Card.Header className="Card-Header">
                <h3>Your Friends</h3>
              </Card.Header>
              <Table hover>
                <tbody>
                  {friendsData.friends_list.length > 0 ? null : (
                      <tr style={{textAlign: 'center'}}>
                        <td>You have no friends</td>
                      </tr>
                  )}
                  {friendsData.friends_list.map((friend) => (
                    <tr key={friend.username}>
                      <td style={{textAlign: 'center'}}>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => getProfile(friend.username)}
                          >
                            {friend.username}
                          </Button>
                      </td>
                      <td style={{textAlign: 'center'}}>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => getMessage(friend.username)}
                        >
                          Message
                        </Button>
                      </td>
                      <td style={{textAlign: 'center'}}>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFriend(friend.username)}
                        >
                          Remove Friend
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
            <Form onSubmit={sendFriendRequest}>
              <Form.Group controlId="formFriendRequest">
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="friend_request"
                    placeholder="Enter username"
                    required
                  />
                  <Button variant="success" type="submit">
                    Send Friend Request
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
            <br />
            {message ? <Alert variant="danger">{message}</Alert> : null}
          </Col>
          <Col xs={12} md={6}>
            <Card className="mb-3 Table">
              <Card.Header className="Card-Header">
                <h2>Pending Requests</h2>
              </Card.Header>
              <Table hover>
                <tbody>
                  {friendsData.pending_requests_list.length > 0 ? null : (
                    <tr style={{textAlign: 'center'}}>
                      <td>You have no pending requests</td>
                    </tr>
                  )}
                  {friendsData.pending_requests_list.map((friend) => (
                    <tr key={friend.username}>
                      <td style={{textAlign: 'center'}}>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => getProfile(friend.username)}
                        >
                          {friend.username}
                        </Button>
                      </td>
                      <td style={{textAlign: 'center'}}>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => acceptFriend(friend.username)}
                        >
                          Accept Friend
                        </Button>
                      </td>
                      <td style={{textAlign: 'center'}}>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFriend(friend.username)}
                        >
                          Reject Friend
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
            <Card className="mb-3 Table">
              <Card.Header className="Card-Header">
                <h2>Your Requests</h2>
              </Card.Header>
              <Table hover>
                <tbody>
                  {friendsData.my_friend_requests.length > 0 ? null : (
                    <tr style={{textAlign: 'center'}}>
                      <td>You have no friend requests</td>
                    </tr>
                  )}
                  {friendsData.my_friend_requests.map((friend) => (
                    <tr key={friend.username}>
                      <td style={{textAlign: 'center'}}> 
                        <div style={{ textAlign: "center" }}>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => getProfile(friend.username)}
                          >
                            {friend.username}
                          </Button>
                        </div>
                      </td>
                      <td style={{textAlign: 'center'}}>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFriend(friend.username)}
                        >
                          Cancel Request
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FriendsList;