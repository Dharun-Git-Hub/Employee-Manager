import './Messages.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        setMessages(savedMessages);
    }, []);

    const handleSend = async () => {
        if (!message.trim()) return;

        const email = "gdvbca@gmail.com";

        try {
            const response = await fetch('http://localhost:3001/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, message }),
            });

            const result = await response.json();
            if (result.success) {
                const newMessages = [...messages, message];
                localStorage.setItem('messages', JSON.stringify(newMessages));
                setMessages(newMessages);
                setMessage('');
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <>
        <div className="messages-cont">
            <span><span style={{cursor: "pointer"}} className='bx bx-arrow-back' onClick={()=>navigate(-1)}></span>Messages</span>
        </div>
        <div className="messages-ui">
            {messages.map((msg, index) => (
                <div key={index} className="message">{msg}</div>
            ))}
        </div>
        <div className='messages-input'>
            <input 
                type="text" 
                placeholder='Type a message...' 
                className='message-input'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className='send-btn' onClick={handleSend}>Send</button>
        </div>
        </>
    )
}

export default Messages;
