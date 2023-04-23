import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [username, setUsername] = React.useState("");
    const [message, setMessage] = React.useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/home")
                const data = await response.json();
                setUsername(data.username);
                setMessage(data.msg);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <h1>Home</h1>
            {message && <p>{message}</p>}
            {username && <p>Welcome to Quizfeed, {username}</p>}
        </div>
    );
}

export default Home;

