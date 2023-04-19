import './GlobalNavbar.css';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function GlobalNavbar() {

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
                    <Nav.Link as={NavLink} to='/' className='mx-3'>TRENDING QUIZZES</Nav.Link>
                    <Nav.Link as={NavLink} to='/' className='mx-3'>NEW QUIZZES</Nav.Link>
                    <Nav.Link as={NavLink} to='/' className='mx-3'>SEARCH</Nav.Link>
                </Nav>
                <Nav className='ms-auto me-5'>
                    <Nav.Link as={NavLink} to='/friends' className='mx-3'>FRIENDS</Nav.Link>
                    <Nav.Link as={NavLink} to='/profile'>
                        <FontAwesomeIcon icon={faUser} />
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/logout' className='mx-3'>LOGOUT</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}