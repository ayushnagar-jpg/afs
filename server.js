const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const mongoURI='mongodb://127.0.0.1:27017/mydb';
try {
    mongoose.connect(mongoURI);
    console.log('MongoDB Connected');
}
catch (err) {
    console.log(err);
};

const UserSchema=new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    password:String,
});
const User=mongoose.model('User',UserSchema);


const PostSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    title:{type: String, required: true},
    content:String,
    username: String
});
const Post=mongoose.model('Post',PostSchema);


function verifyToken(req,res,next)
{
    const token=req.headers['authorization'];

    if(!token)
    {
        return res.status(403).send('A token is required for authentication');
    }

    try
    {
        req.user = jwt.verify(token.split(' ')[1], 'YOUR_SECRET_KEY');
        next();
    }
    catch(err)
    {
        return res.status(401).send('Invalid Token');
    } 
}

app.post('/register',async (req,res)=>{
    try
    {
        const hashedPassword = bcrypt.hashSync(req.body.password,8);
        const user = new User({
            username:req.body.username,
            password:hashedPassword
        });
        await user.save();
        res.status(201).send('User Registered successfully');
    }
    catch (error)
    {
        res.status(500).send('Error registering user');
    }
});

app.post('/login',async (req,res)=>{
    try
    {
        const user = await User.findOne({
            username:req.body.username
        });

        if(user && bcrypt.compareSync(req.body.password, user.password))
        {
            const token = jwt.sign({userId:user._id},'YOUR_SECRET_KEY');
            res.json({token});
        }
        else
        {
            res.status(401).send('Invalid Credentials');
        }
    }
    catch (error)
    {
        res.status(500).send('Error during Login');
    }
});

app.post('/posts',verifyToken,async (req,res)=>{
    try
    {
        const user = await User.findById(req.user.userId);
        if (!user) 
        {
            return res.status(404).send('User not found');
        }

        const post = new Post({
            userId:req.user.userId,
            title:req.body.title,
            content:req.body.content,
            username: user.username
        });
        await post.save();
        res.status(201).send('Post created Successfully');
    }
    catch (error)
    {
        res.status(500).send('Error creating post');
    }
});

app.get('/posts',verifyToken,async (req,res)=>{
    try
    {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (error)
    {
        res.status(500).send('Error fetching posts');
    }
});

app.get('/posts/:postId',verifyToken,async (req,res)=>{
    try
    {
        const post = await Post.findById(req.params.postId);
        if(!post)
        {
            return res.status(404).send('Post not Found');
        }
        res.json(post);
    }
    catch(error)
    {
        res.status(500).send('Error fetching post');
    }
});

app.put('/posts/:postId',verifyToken, async (req,res)=>{
    try
    {
        const result = await Post.findOne({
            _id: req.params.postId,
            userId: req.user.userId
        });

        if (!result)
        {
            return res.status(404).send('unauthorized');
        }

        const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {new : true})
        res.status(200).json(post);
    }
    catch(error)
    {
        res.status(500).send('Error updating post');
    }
});

app.delete('/posts/:postId', verifyToken, async (req, res) => {
    try 
    {
        const result = await Post.findOneAndDelete({
            _id: req.params.postId,
            userId: req.user.userId
        });

        if (!result)
        {
            return res.status(404).send('Post not found or unauthorized');
        }
        res.status(200).send('Post deleted successfully');
    }
    catch (error) 
    {
        res.status(500).send('Error deleting post');
    }
    });
    const port = 3001;

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});