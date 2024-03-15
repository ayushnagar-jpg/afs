
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import Counter from './Counter';


export default function Home() 
{
    // const [display_counter, setDisplay_Counter] = useState(false);
    const nav = useNavigate();
    
    // if(display_counter)
    // {
    //     return <Counter></Counter>
    // }

    if(!localStorage.getItem('jwtToken'))
    {
        nav('/login');
    }


    return (
        <div>
            <h1>Home</h1>
            <Link to = "/login">Login</Link>
        </div>
    );
}