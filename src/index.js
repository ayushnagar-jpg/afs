import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './Home.js';
import Login from './Login.js';
import Posts from './Posts.js';
import ViewPosts from './ViewPosts.js';
import Counter from './Counter.js'
import Register from './Register.js';
import CreatePost from './CreatePost.js';
import AboutUs from './AboutUs.js';

const router = createBrowserRouter([
    {
        path : '/',
        element : <ViewPosts></ViewPosts>,
        errorElement : <h1>Page Not Found</h1>
    },
    {
        path : '/login',
        element : <Login></Login>,
    },
    {
        path : '/posts/:postId',
        element : <Posts></Posts>
    },
    {
        path : '/posts',
        element : <ViewPosts></ViewPosts>
    },
    {
        path : '/counter',
        element : <Counter></Counter>
    },
    {
        path : "/register",
        element : <Register></Register>
    },
    {
        path :"/create_post",
        element: <CreatePost></CreatePost>
    },
    {
        path: "/about_us",
        element: <AboutUs></AboutUs>
    }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

        <RouterProvider router = {router}></RouterProvider>
  
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
