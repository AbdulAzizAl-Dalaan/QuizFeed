import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './Friends.css'

function FriendsList () {
    const [friendsData, setFriendsData] = React.useState({
        friends_list: [],
        pending_requests_list: [],
        my_friend_requests: []
    });
    const [message, setMessage] = React.useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/friends")
                const data = await response.json();
                setFriendsData(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const acceptFriend = async (username) => {
        try {
            const response = await fetch(`/friends/acceptfriend/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username
                }),
            });
            const data = await response.json();
            if (data.success) {
                window.location.reload();
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeFriend = async (username) => {
        try {
            const response = await fetch(`/friends/removefriend/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username
                }),
            });
            const data = await response.json();
            if (data.success) {
                window.location.reload();
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const sendFriendRequest = async (e) => {
        e.preventDefault();
        const friend_request = e.target.friend_request.value;
        try {
            const response = await fetch(`/friends/sendfriendrequest/${friend_request}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    friend_request
                }),
            });
            const data = await response.json();
            if (data.success) {
                window.location.reload();
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getMessage = async (username) => {
        try 
        {
            navigate(`message/${username}`);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <div className="tables-container">
        <Table bordered hover>
            <h2>Your Friends</h2>
            <tbody>
                {friendsData.friends_list.length > 0 ? null : <tr><td>You have no friends</td></tr>}
                {friendsData.friends_list.map((friend) => (
                    <tr key={friend.username}>
                        <td><a href={`/profile/${friend.username}`}>{friend.username}</a></td>
                        <td><Button variant="success" onClick={() => getMessage(friend.username)}>Message</Button></td>
                        <td><Button variant="danger" onClick={() => removeFriend(friend.username)}>Remove Friend</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Table bordered hover>
            <h2>Pending Requests</h2>
            <tbody>
                {friendsData.pending_requests_list.length > 0 ? null : <tr><td>You have no pending requests</td></tr>}
                {friendsData.pending_requests_list.map((friend) => (
                    <tr key={friend.username}>
                        <td><a href={`/profile/${friend.username}`}>{friend.username}</a></td>
                        <td><Button variant="success" onClick={() => acceptFriend(friend.username)}>Accept Friend</Button></td>
                        <td><Button variant="danger" onClick={() => removeFriend(friend.username)}>Reject Friend</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Table bordered hover>
            <h2>Your Requests</h2>
            <tbody>
                {friendsData.my_friend_requests.length > 0 ? null : <tr><td>You have no friend requests</td></tr>}
                {friendsData.my_friend_requests.map((friend) => (
                    <tr key={friend.username}>
                        <td><a href={`/profile/${friend.username}`}>{friend.username}</a></td>
                        <td><Button variant="danger" onClick={() => removeFriend(friend.username)}>Cancel Request</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        <form onSubmit={sendFriendRequest}>
            <input type="text" name="friend_request" placeholder="Enter username" />
            <input type="submit" value="Send Friend Request" />
        </form>
        {message ? <p>{message}</p> : null}
        </>
    );
}

export default FriendsList;