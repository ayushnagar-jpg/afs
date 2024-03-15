import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./css/posts.css";

export default function Viewport() {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [errorType, setErrorType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/posts", {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("jwtToken")
                    }
                });
                setApiData(response.data);
                setLoading(false);
            } catch (error) {
                setErrorType(error.message);
                setApiError(true);
            }
        };

        if (localStorage.getItem("jwtToken")) {
            fetchData();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleCreatePost = () => {
        navigate('/create_post');
    };

    const handleViewPost = (postId) => {
        navigate(`/posts/${postId}`);
    };

    const handleAboutUs = () => {
        navigate('/about_us');
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    };

    if (apiError) {
        return <h1>{errorType}</h1>;
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="post_box">
            <div className="post_header">
                <h1 className="post_heading">Posts:</h1>
                <button className="logout_button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="post_footer">
                <button className="post_create" onClick={handleCreatePost}>Create Post</button>
                <button className="about_button" onClick={handleAboutUs}>About Us</button>
            </div>
            <div className="post_div">
                {apiData.map(post => (
                    <p className="post_data" key={post.id} onClick={() => handleViewPost(post._id)}>
                        Title: {post.title}<br />Posted By: {post.username}
                    </p>
                ))}
            </div>
        </div>
    );
}
