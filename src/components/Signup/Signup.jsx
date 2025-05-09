import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !password || !department || !designation || !contactNumber) {
            alert('Please fill all fields');
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    department,
                    designation,
                    contact_number: contactNumber,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify({
                    username,
                    password,
                    department,
                    designation,
                    contact_number: contactNumber,
                }));
                alert('Signup Successful');
                navigate('/login');
            } else {
                alert(data.message || 'Signup Failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error during signup');
        }
    };

    return (
        <>
            <div className="nav-bar">RS - TECH</div>
            <div className="login-cont">
                <form className="login-form" onSubmit={handleSignup}>
                    <input type="text" placeholder="Try a Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Set a Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                    <input type="text" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                    <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                    <button type="submit">Signup</button>
                </form>
            </div>
        </>
    );
};

export default Signup;
