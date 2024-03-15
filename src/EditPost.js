import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./css/editPost.css"


export default function EditPost(props)
{
    const navigate = useNavigate();
    const params = useParams();
    const [content, setContent] = useState('');
    const [f, setF] = useState(false);
    const [error_type, setError] = useState('');

    if(!f)
    {
        setContent(props.content);
        setF(true);
    }
    

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    const post = async () =>
    {
        try
        {
            await axios.put(`http://localhost:3001/posts/${params.postId}`, {content},{
                headers : {
                    authorization : "Bearer " + localStorage.getItem("jwtToken")
                }
            });
            navigate('/posts');
        }
        catch(error)
        {
            setError("you not allowed to edit");
        }
    }

    if(props.flag)
    {
        return (
            <div>
                <h3 className="post_Error">{error_type}</h3>
                <textarea className="create_input" rows="4" cols="20" value={content} onChange={handleContent} placeholder="Content"></textarea>
                <button onClick={post}>Post</button>
            </div>
        )
    }
    else
    {
        return(
            <div>
                <h3>{content}</h3>
            </div>
        )
    }
}