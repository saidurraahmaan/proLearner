import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import {OAuth2Client} from 'google-auth-library'

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


//@desc     Register New User
//@route    POST / api / user
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
})

//@desc     Authenticate a User
//@route    POST / api / user / login
//@access   Private
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials');
    }

})

//@desc     Authenticate a User using google
//@route    POST / api / user / googleLogin
//@access   Private
const googleLogin = asyncHandler(async (req, res) => {
    const {tokenId} = req.body;
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID
    })

    const {name, email} = ticket.getPayload();
    const password = email + process.env.JWT_SECRET;

    const user = await User.findOne({email});
    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        if (newUser) {
            res.status(201).json({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: generateToken(newUser._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data');
        }
    }
})


//@desc     Get User data
//@route    GET / api / user/ me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
    console.log(req.user._id);
    const user = await User.findById(req.user._id);
    if (user) {
        res.json(user);
    } else {
        res.status(400);
        throw new Error('User not valid');
    }
})


//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export {
    registerUser,
    loginUser,
    googleLogin,
    getMe,
}