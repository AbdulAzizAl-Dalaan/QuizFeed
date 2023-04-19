import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// import Auth variable

function Login() {
    // defining stateful value variables and functions to update them
    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ message, setMessage ] = React.useState(null);

    // defining a function to navigate to a different page
    const navigate = useNavigate();

    // defining a function to handle the form submission
    const handleLogin = async (event) => {

        // prevent the default form submission behavior
        event.preventDefault();

        // send a POST request to the server
        try {

            // send a POST request to the server
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                console.log('Login successful');
                setMessage(data.message);
                navigate('/home');
            }
            else // if the login failed, display an error message
            {
                console.log('Login failed');
                setMessage(data.message)
            }
        } 
        catch (err) // if an error occurred, display an error message
        {
            console.log(err);
            setMessage( err.name + ': ' + err.message );
        }
    };

    // display the login form
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <br />
                <input type='submit' value='Submit' />
            </form>
            {message && <p>{message}</p>}
            <Link to='/register'>
                <button type="button">Create an account</button>
            </Link>
            <Link to='/forgotpassword'>
                <button type="button">Forgot password</button>
            </Link>
        </div>
    );
}

export default Login;