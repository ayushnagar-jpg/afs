import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/login.css';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleForm = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post("http://localhost:3001/login", {
                username: username,
                password: password
            });

            if (res.status === 200) {
                localStorage.setItem("jwtToken", res.data.token);
                navigate('/posts');
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
                setLoginError("Incorrect Username or Password");
            } else {
                setLoginError("An error occurred. Please try again later.");
            }
        }
    }

    const handleUsername = (event) => {
        setUserName(event.target.value);
        setLoginError("");
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        setLoginError("");
    }

    const registerButtonClicked = () => {
        navigate('/register');
    }

    return (
        <div className="login_box">
            <h1 className="login_heading">Postify</h1>
            <form onSubmit={handleForm}>
                <input
                    className="login_input"
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    placeholder="Username"
                    required
                />
                <input
                    className="login_input"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Password"
                    required
                />
                <h4 className="login_error">{loginError}</h4>
                <button className="login_button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p>No account? No worries!! <span className="login_reg_button" onClick={registerButtonClicked}>Register</span></p>
        </div>
    );
}
