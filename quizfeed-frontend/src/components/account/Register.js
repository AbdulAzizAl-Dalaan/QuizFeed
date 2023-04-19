import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register () {

    // obtaining the values from the form fields and storing them in state
    const [ firstname, setFirstname ] = React.useState('');
    const [ lastname, setLastname ] = React.useState('');
    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ number, setNumber ] = React.useState('');
    const [ message, setMessage ] = React.useState('');
    
    // useNavigate hook to redirect to the login page after successful registration
    const navigate = useNavigate();

    // function to handle the registration form submission
    const handleSubmit = async (event) => {

        // prevent the default form submission behavior
        event.preventDefault();

        // send a POST request to the server
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    username,
                    password,
                    email,
                    number
                }),
            });

            // convert the response to JSON
            const data = await response.json();

            // if the registration was successful, redirect to the login page
            if (data.success) {
                console.log('Registration successful');
                navigate('/login');
            }
            else // otherwise, display the error message
            {
                console.log('Registration failed');
                setMessage(data.message)
            }
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
    
    return ( 
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type='text' value={firstname} onChange={(event) => setFirstname(event.target.value)} required/>
                </label>
                <br />
                <label>
                    Last Name:
                    <input type='text' value={lastname} onChange={(event) => setLastname(event.target.value)} required/>
                </label>
                <br />
                <label>
                    Username:
                    <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} required/>
                </label>
                <br />
                <label>
                    Password:
                    <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} required/>
                </label>
                <br />
                <label>
                    Email:
                    <input type='email' value={email} onChange={(event) => setEmail(event.target.value)} required/>
                </label>
                <br />
                <label>
                    Phone Number:
                    <input type='tel' value={number} onChange={(event) => setNumber(event.target.value)} required/>
                </label>
                <br />
                <input type='submit' value='Submit' />
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
