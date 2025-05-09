import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser?.username && storedUser?.password) {
            navigate('/dashboard');
        }
    }, []);
    
    const handleLogin = (e) => {
        e.preventDefault();
    
        if (username.trim() !== '' && password.trim() !== '') {
            fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify(data.user)); // ✅ Save full user info
                    navigate('/dashboard');
                } else {
                    alert("Invalid credentials");
                }
            })
            .catch(err => {
                console.error('Login failed:', err);
                alert("Login error");
            });
        } else {
            alert("Please enter valid credentials");
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin(event);
        }
    }
    
    return (
        <>
        <div className="nav-bar">
            <span style={{marginLeft: "10px"}}>RS - TECH</span>
            <span onClick={()=>navigate('/signup')} style={{marginRight: "10px", fontSize: "20px", cursor: "pointer"}}>Signup</span>
        </div>
        <div className="login-cont">
            <h2 style={{fontFamily:"cursive", marginBottom: "20px"}}>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input type="text" placeholder='Username' onChange={(event)=>{setUsername(event.target.value)}}/>
                <input type="password" onKeyDown={(event)=>handleKeyDown(event)} placeholder='Password' onChange={(event)=>{setPassword(event.target.value)}}/>
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    )
}

export default Login;