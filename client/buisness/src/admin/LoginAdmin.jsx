import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/admin/login', { username, password });
            setMessage('Login successful!');
            // Save token or any other necessary data
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('businessName', response.data.business);

            navigate('/todos');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred during login');
            }
        }
    };

    return (
        <div>
            <h2>Login admin</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginAdmin;
