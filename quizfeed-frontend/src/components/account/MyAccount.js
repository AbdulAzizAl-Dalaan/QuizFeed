import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';

function MyAccount() {
    const [MyAccountData, setMyAccountData] = useState({
        user: {},
        friends_list: [],
        quizzes_taken: [], 
        quizzes_created: [],
    });
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyAccount = async () => {
            try {
                const response = await fetch(`/myAccount`);
                const data = await response.json();
                if (data.success) {
                    setMyAccountData(data);
                } else {
                    setMessage(data.message);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchMyAccount();
    }
    , []);

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    if (!MyAccountData) {
        return <p>Error loading account</p>;
    }

    return (
        <Container>
         <Row className="mt-5">
      <Col xs={12} md={{ span: 3, offset: 1 }}>
        <Image
          src={MyAccountData.user.profile_pic}
          roundedCircle
          fluid
          className="mx-auto mt-3"
          width="200"
          height="200"
        />
      </Col>
      <Col xs={12} md={7}>
        <h1 className="display-4 mb-4">{MyAccountData.user.username}</h1>
        <div className="mb-3">
          <Button onClick={handleSettingsClick} variant="outline-primary">
            Edit Account
          </Button>
        </div>
        <p>Email: {MyAccountData.user.email}</p>
        <p>First Name: {MyAccountData.user.firstname}</p>
        <p>Last Name: {MyAccountData.user.lastname}</p>
        <p>Number: {MyAccountData.user.number}</p>
        <p className="lead mb-4">{MyAccountData.user.bio}</p>
      </Col>
    </Row>
        <Row className="mt-5">
            <Col xs={12} md={4}>
                <h2 className="mb-4" style={{textAlign: "center"}}>Friends</h2>
                {MyAccountData.friends_list.length === 0 && <p style={{textAlign: 'center'}}>No friends yet</p>}
                <ListGroup variant="flush" className="text-center">
                    {MyAccountData.friends_list.map((friend) => (
                        <ListGroup.Item key={friend.username}>
                            {friend.username}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
            <Col xs={12} md={4}>
                <h2 className="mb-4" style={{textAlign: "center"}}>Quizzes Created</h2>
                {MyAccountData.quizzes_created.length === 0 && <p style={{textAlign: 'center'}}>No quizzes created yet</p>}
                <ListGroup variant="flush" className="text-center">
                    {MyAccountData.quizzes_created.map((quiz) => (
                        <ListGroup.Item key={quiz.id}>
                            {quiz.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
            <Col xs={12} md={4}>
                <h2 className="mb-4" style={{textAlign: "center"}}>Quizzes Taken</h2>
                {MyAccountData.quizzes_taken.length === 0 && <p style={{textAlign: 'center'}}>No quizzes taken yet</p>}
                <ListGroup variant="flush" className="text-center">
                    {MyAccountData.quizzes_taken.map((quiz) => (
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

export default MyAccount;