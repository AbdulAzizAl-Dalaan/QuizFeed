import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';

function Profile() {
    const [profileData, setProfileData] = useState({
        user: {},
        friends_list: [],
        quizzes_taken: [],
        quizzes_created: [],
    });
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const urlParams = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/profile/${urlParams.username}`);
                const data = await response.json();
                if (data.success) {
                    setProfileData(data);
                } else {
                    setMessage(data.message);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchProfile();
    }
    , []);

    const updateProfile = async () => {
        try {
            const response = await fetch(`/profile/${urlParams.username}`);
            const data = await response.json();
            if (data.success) {
                setProfileData(data);
            } else {
                setMessage(data.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleMessage = () => {
        navigate('/friends/message/' + profileData.user.username);
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
            updateProfile();
          } else {
            setMessage(data.message);
          }
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
            updateProfile();
          } else {
            setMessage(data.message);
          }
        } catch (err) {
          console.log(err);
        }
      };
    

    if (message == 'User does not exist') {
        return <h5 style={{textAlign: 'center', marginTop: '100px'}}>Error this User does not exist</h5>;
    }

    return (
        <Container>
        <Row className="mt-5">
     <Col xs={12} md={{ span: 3, offset: 1 }}>
       <Image
         src={profileData.user.profile_pic}
         roundedCircle
         fluid
         className="mx-auto mt-3"
         width="200"
         height="200"
       />
     </Col>
     <Col xs={12} md={7}>
       <h1 className="display-4 mb-4">{profileData.user.username}</h1>
        {profileData.type === 'friend' &&
        <div className="mb-3">
            <Button onClick={handleMessage} variant="outline-success" style={{ marginRight: '10px'}}>
                Message
            </Button>
            <Button onClick={() => removeFriend(profileData.user.username)} variant="outline-danger">
                Remove Friend
            </Button>
            < br />
            < br />
            <p>Email: {profileData.user.email}</p>
            <p>First Name: {profileData.user.firstname}</p>
            <p>Last Name: {profileData.user.lastname}</p>
            <p>Number: {profileData.user.number}</p>
            <p className="lead mb-4">{profileData.user.bio}</p>
       </div>}

       {profileData.type === 'pending_request' &&
        <div className="mb-3">
                <Button onClick={() => removeFriend(profileData.user.username)} variant="outline-danger">
                    Cancel Request
                </Button>
        </div>}

        {profileData.type === 'pending_friend' &&
        <div className="mb-3">
                <Button onClick={() => acceptFriend(profileData.user.username)} variant="outline-success" style={{ marginRight: '10px'}}>
                    Accept Request
                </Button>
                <Button onClick={() => removeFriend(profileData.user.username)} variant="outline-danger">
                    Decline Request
                </Button>
        </div>}
     </Col>
   </Row>
       <Row className="mt-5">
           <Col xs={12} md={4}>
               <h2 className="mb-4" style={{textAlign: "center"}}>Friends</h2>
               {profileData.friends_list.length === 0 && <p style={{textAlign: 'center'}}>No friends yet</p>}
               <ListGroup variant="flush" className="text-center">
                   {profileData.friends_list.map((friend) => (
                       <ListGroup.Item key={friend.username}>
                           {friend.username}
                       </ListGroup.Item>
                   ))}
               </ListGroup>
           </Col>
           <Col xs={12} md={4}>
               <h2 className="mb-4" style={{textAlign: "center"}}>Quizzes Created</h2>
               {profileData.quizzes_created.length === 0 && <p style={{textAlign: 'center'}}>No quizzes created yet</p>}
               <ListGroup variant="flush" className="text-center">
                   {profileData.quizzes_created.map((quiz) => (
                       <ListGroup.Item key={quiz.id}>
                           {quiz.title}
                       </ListGroup.Item>
                   ))}
               </ListGroup>
           </Col>
           <Col xs={12} md={4}>
               <h2 className="mb-4" style={{textAlign: "center"}}>Quizzes Taken</h2>
               {profileData.quizzes_taken.length === 0 && <p style={{textAlign: 'center'}}>No quizzes taken yet</p>}
               <ListGroup variant="flush" className="text-center">
                   {profileData.quizzes_taken.map((quiz) => (
                       <ListGroup.Item key={quiz.id}>
                           {quiz.title}
                       </ListGroup.Item>
                   ))}
               </ListGroup>
           </Col>
       </Row>
       {message && <p>{message}</p>}
   </Container>
    )
}

export default Profile;