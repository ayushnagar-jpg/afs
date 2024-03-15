import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

import "./css/register.css"

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/register", {
                username: username,
                password: password
            })
            if (res.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="register-container">
            <h1 className="register-heading">YOU_POST</h1>
            <form onSubmit={handleForm}>
                <input className="register-input" type='text' value={username} onChange={handleUsername} placeholder="Username"></input><br></br>
                <input className="register-input" type='password' value={password} onChange={handlePassword} placeholder="Password"></input><br></br>
                <button className="register-button">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>Already have an account? <Link to="/login" className="register-login-link">Login</Link></p>
        </div>
    );
}
