import './GlobalNavbar.css';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function GlobalNavbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const unAuthPaths = ['/', '/register', '/forgotpassword', '/logout'];

    const handleLogout = async () => {
      try {
        const response = await fetch('/logout', {
          method: 'GET',
        });
        navigate('/');
        } catch (err) {
            console.error(err);
        }
    }

    const checkPath = unAuthPaths.includes(location.pathname);

    return (
        <Navbar className="globalNav" bg="dark" variant="dark" expand="lg" sticky="top">
            <Nav.Link as={NavLink} to="/" className="ms-5 me-3">
                <Navbar.Brand className="brand">
                    Q<br />F
                </Navbar.Brand>
            </Nav.Link>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="trendingQuizzes" className="mx-3" disabled={checkPath}>
                        HOME
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="quiz/new" className="mx-3" disabled={checkPath}>
                        CREATE QUIZ
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="searchQuizzes" className="mx-3" disabled={checkPath}>
                        SEARCH
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto me-5">
                    <Nav.Link as={NavLink} to="/friends" className="mx-3" disabled={checkPath}>
                        FRIENDS
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/myAccount" disabled={checkPath}>
                        <FontAwesomeIcon icon={faUser} />
                    </Nav.Link>
                    {checkPath ? (
                        <Nav.Link as={NavLink} to="/" className="mx-3">
                            LOGIN
                        </Nav.Link>
                    ) : (
                        <Nav.Link as={NavLink} to="/logout" className="mx-3" onClick={handleLogout}>
                            LOGOUT
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}