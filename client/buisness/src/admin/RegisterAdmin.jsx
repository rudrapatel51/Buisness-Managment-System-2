import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [business, setBusiness] = useState('');
    const navigate = useNavigate()


    const handleRegister = async (e) => {
        e.preventDefault();
        const lowerCaseBusiness = business.toLowerCase();

        try {
            const response = await axios.post('http://localhost:5000/admin/register', { username, password,business: lowerCaseBusiness});
            setMessage(response.data.message);
            
            if (response.data.business) {
                localStorage.setItem('businessName', response.data.business); // Corrected localStorage usage
            }

            console.log(response);
            navigate('/login/admin');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred during registration');
            }
        }
    };
    return (
        <div>
            <h2>Register admin</h2>
            <form onSubmit={handleRegister}>
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
                <div>
                    <label>business Name</label>
                    <input
                        type="business"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterAdmin;
