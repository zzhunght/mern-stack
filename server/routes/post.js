const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')

// GET
// api/posts
// private access
router.get('/',verifyToken ,async (req, res)=>{

    try {
        const posts = await Post.find({user : req.userId}).populate('user',['username'])

        res.status(200).json(
            {
                success: true,
                posts
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                success:false,
                message:"something went wrong"
            }
        )
    }
})


// POST
// api/posts
// private access
router.post('/',verifyToken ,async (req, res)=>{
    const {title , description , url, status} = req.body;

    if(!title)
        return res.status(400).json(
            {
                success : false, 
                message :" Title is required"
            }
        )
    try {
        const newPost = new Post({
            title : title,
            description : description,
            url : url.startsWith('https:') ? url : 'https://' + url.trim(),
            status : status || "TO LEARN",
            user: req.userId
        })
        await newPost.save()
        res.status(200).json(
            {
                success : true,
                message : "Happy Learning!!!",
                post: newPost
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                success:false,
                message:"something went wrong"
            }
        )
    }
})


// UPDATE
// api/posts/:id
// private access
router.put('/:id',verifyToken , async (req, res)=>{
    const id = req.params.id
    const {title , description , url, status} = req.body;

    if(!title)
        return res.status(400).json(
            {
                success : false, 
                message :" Title is required"
            }
        )
    try {
        let updatePost = {
            title,
            description : description || '',
            status: status || 'TO LEARN',
            url: (url.startsWith('https://') ? url : 'https://' + url.trim()) 
            || '', 
        }

        const conditionalUpdate = {
            _id: req.params.id,
            user: req.userId
        }

        updatePost = await Post.findOneAndUpdate(conditionalUpdate,updatePost,{
            new:true
        })

        if(!updatePost) 
            return res.status(401).json({
                success : false,
                message :"Post not found or invalid authorize" 
            })

        res.status(200).json({
            success : true,
            message :"Post updated successfully",
            post: updatePost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                success:false,
                message:"something went wrong"
            }
        )
    }

})
// UPDATE
// api/post/:id
// private access
router.delete('/:id',verifyToken , async (req, res)=>{
    const id = req.params.id
    

    if(!id)
        return res.status(400).json(
            {
                success : false, 
                message :" id is required"
            }
        )
    try {
        

        const conditionalDelete = {
            _id: req.params.id,
            user: req.userId
        }

        const deletePost = await Post.findOneAndDelete(conditionalDelete)

        if(!deletePost) 
            return res.status(401).json({
                success : false,
                message :"Post not found or invalid authorize" 
            })

        res.status(200).json({
            success : true,
            message :"Post delete successfully",
            post: deletePost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                success:false,
                message:"something went wrong"
            }
        )
    }

})
module.exports = router