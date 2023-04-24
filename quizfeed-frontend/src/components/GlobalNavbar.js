import './GlobalNavbar.css';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function GlobalNavbar() {

    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        const response = await fetch('/logout', {
          method: 'GET',
        });
        navigate('/login');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Navbar className='globalNav' bg='dark' variant='dark' expand='lg' sticky='top'>
            <Nav.Link as={NavLink} to='/' className='ms-5 me-3'>
                <Navbar.Brand className='brand'>
                    Q<br />F
                </Navbar.Brand>
            </Nav.Link>
            <Navbar.Toggle aria-controls='navbar-nav' />
            <Navbar.Collapse id='navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link as={NavLink} to='/home' className='mx-3'>HOME <span className='visually-hidden'>(current)</span></Nav.Link>
                    <Nav.Link as={NavLink} to='/trendingQuizzes' className='mx-3'>TRENDING QUIZZES</Nav.Link>
                    <Nav.Link as={NavLink} to='/newQuizzes' className='mx-3'>NEW QUIZZES</Nav.Link>
                    <Nav.Link as={NavLink} to='/searchQuizzes' className='mx-3'>SEARCH</Nav.Link>
                </Nav>
                <Nav className='ms-auto me-5'>
                    <Nav.Link as={NavLink} to='/friends' className='mx-3'>FRIENDS</Nav.Link>
                    <Nav.Link as={NavLink} to='/myAccount'>
                        <FontAwesomeIcon icon={faUser} />
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/logout' className='mx-3' onClick={handleLogout}>LOGOUT</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}