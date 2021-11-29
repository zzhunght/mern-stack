const express = require('express');
const router = express.Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const verifyToken = require('../middleware/auth')

//router get api/auth
//public
// check user is login
router.get('/',verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')

        if(!user) return res.status(400).json({
            success: false, message:'user not found'
        })

        res.status(200).json({
            success: true, user
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

router.post('/register', async (req, res) => {
    const { username, password} = req.body
    //kiem tra co nhap user/password ko
    if(!username || !password) {
        return res.status(400).json({success: false , message: 'missing username or password'});
    }

    try {
        //kiem tra xem user da co chua
        const user = await User.findOne({username:username})
        // console.log('user',user)
        
        //neu co thong bao da co 
        if(user) {
            return res.status(400).json({success: false, message:' username already in use'})
        }

        //ma hoa mk
        const hashedPassword = await argon2.hash(password)

        const newUser = new User({username:username,password:hashedPassword})
        await newUser.save()

        //tao acess token
        const accessToken = jwt.sign(
            {userId:newUser._id},
            process.env.ACCESS_TOKEN_SECRET
        )

        res.status(200).json(
            {
                success:true ,
                message:"create account sucessfully",
                accessToken:accessToken
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

//login
router.post('/login', async(req, res)=>{
    const { username, password} = req.body
    //kiem tra co nhap user/password ko
    if(!username || !password) {
        return res.status(400).json({success: false , message: 'missing username or password'});
    }
    try {
        const user = await User.findOne({username:username})
        // console.log('user',user)
        
        //neu co thong bao da co 
        if(!user) {
            return res.status(400).json({success: false, message:'incorrect username or password'})
        }
        const passwordValid = argon2.verify(user.password , password)
        if(!passwordValid) {
            return res.status(400).json({success: false, message:'incorrect username or password'})
        }
        const accessToken = jwt.sign(
            {userId:user._id},
            process.env.ACCESS_TOKEN_SECRET
        )

        res.status(200).json(
            {
                success:true ,
                message:"login sucessfully",
                accessToken:accessToken
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


module.exports = router;