import React from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ password2, setPassword2 ] = React.useState('');
    const [ message, setMessage ] = React.useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    password2
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Password reset successful');
                navigate('/login');
            }
            else
            {
                console.log('Password reset failed');
                setMessage(data.message)
            }
        } 
        catch (err) 
        {
            console.log(err);
            setMessage(err.name + ': ' + err.message);
        }
    };
    return (
        <div>
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <br />
          <label>
            New Password:
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <br />
          <label>
            Confirm New Password:
            <input type="password" value={password2} onChange={(event) => setPassword2(event.target.value)} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
        {message && <p>{message}</p>}
      </div>
    );
}


export default ForgotPassword;