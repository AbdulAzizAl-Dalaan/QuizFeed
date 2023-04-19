import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

function MessageList() {
    const [messagesData, setMessagesData] = React.useState({
        status: '',
        message: '',
        messages: [],
        user: '',
        friend: ''
    });
    const [message, setMessage] = React.useState('');

    const urlParams = useParams();

    useEffect(() => {
        const fetchMessages = async (username) => {
            try {
                const response = await fetch(`${urlParams.username}`);
                const data = await response.json();
                setMessagesData(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessages();
    }, []);

    const sendMessage = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`sendmessage/${urlParams.username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender: messagesData.user,
                    receiver: messagesData.friend,
                    message: event.target.content.value
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



    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
        }}>
            <h2>Messages with {messagesData.friend}</h2>
            <div>
                {messagesData.messages.map((single_message) => (
                    <Alert variant={single_message.sender === messagesData.user ? "primary" : "dark"}
                    style={{textAlign: single_message.sender === messagesData.user ? 'right' : 'left',
                            position: 'relative', left: single_message.sender === messagesData.user ? '50%' : '0', 
                            borderRadius: '5px', padding: '5px', marginBottom: '5px', maxWidth: '350px'}}>
                        <Alert.Heading>{single_message.sender}</Alert.Heading>
                        <p>
                            {single_message.content}
                        </p>
                    </Alert>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <div className="form-group" >
                    <label htmlFor="content">Message</label>
                    <input type="text" className="form-control" id="content" required name="content" />
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
      );
}

export default MessageList;