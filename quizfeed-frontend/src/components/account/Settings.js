import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/settings');
        const data = await response.json();

        if (data.success) {
          setFirstname(data.user.firstname);
          setLastname(data.user.lastname);
          setUsername(data.user.username);
          setEmail(data.user.email);
          setNumber(data.user.number);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setMessage(err.name + ': ' + err.message);
      }
    };

    fetchUserInfo();
  }, []);

  const saveChanges = async (event) => {
    event.preventDefault();

    if (password !== password2) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          number,
          password,
          password2
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        navigate('/login');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.name + ': ' + err.message);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={saveChanges}>
        <label>
          First Name:
          <input type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastname} onChange={(event) => setLastname(event.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" value={number} onChange={(event) => setNumber(event.target.value)} />
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
        <input type="submit" value="Save Changes" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Settings;
