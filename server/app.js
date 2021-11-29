const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

const AuthRoute = require('./routes/auth');
const PostRoute = require('./routes/post');

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/mern-learn',{
            autoIndex: true,
        },()=>console.log('Connect db successfully!!'));
        
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }

}
connectDB()


app.use(express.json());
app.use(cors())

app.get('/',(req, res) => {
    res.send('hello world')
})
app.use('/api/auth',AuthRoute);
app.use('/api/posts',PostRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`listen on port ${PORT}`))