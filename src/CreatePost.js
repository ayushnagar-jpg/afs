import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./css/create_post.css";

export default function CreatePost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) {
            navigate('/login');
        }
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:3001/posts",
                { title: title, content: content },
                { headers: { authorization: "Bearer " + localStorage.getItem("jwtToken") } }
            );
            if (res.status === 201) {
                navigate('/posts');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const goBack = () => {
        navigate('/posts');
    }

    return (
        <div className="create-post-container">
            <button className="back-button" onClick={goBack}>Go Back</button>
            <h1>Create Post:</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    className="create-input"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Title"
                />
                <textarea
                    className="create-input"
                    rows="4"
                    cols="20"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Content"
                />
                <button className="create-button">Post</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}
