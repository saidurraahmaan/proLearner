import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


//@desc     Fetch all post
//@route    GET / api/ post / all/
//@access   Public
const getAllPost = asyncHandler(async (req,res)=>{

    const posts =await Post.find({});

    res.json(posts);
})

//@desc     Fetch User all posts
//@route    GET / api/ post/ user/ all/
//@access   Private
const getMyPost = asyncHandler(async(req,res)=>{

    const posts =await Post.find({userId: req.user._id});
    res.json(posts);
})

//@desc     delete user post
//@route    DELETE / api/ topic/ delete/ :id
//@access   Private
const deleteMyPost = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    let post = await Post.find({_id:id,userId:req.user._id})
    if(!post){
        res.status(400);
        throw new Error('Post not found');
    }

    await Post.deleteOne({_id:id});
    res.status(201).json({message:"Deleted successfully"});
})

//@desc     Fetch a Post
//@route    GET / api /post / :id
//@access   Public
const getAPost = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id);
    res.json(post);
})

//@desc     create a post
//@route    Post / api/  post/
//@access   Private
const createAPost = asyncHandler(async (req,res)=>{

    const post = new Post({
        userId:req.user._id,
        title:req.body.title,
        content:req.body.content,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
})
//@desc     create a comment
//@route    Post / api/  post/ :id
//@access   Private
const createAComment = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id);
    if(!post){
        res.status(400);
        throw new Error('Post not found');
    }
    const {name} = await User.findById(req.user._id);
    const comment = {
        userId:req.user._id,
        name,
        comment:req.body.comment,
    }

    post.comments.push(comment);
    await post.save();
    res.status(201).json({message:'Comment Added'});
})
//@desc     Update post
//@route    put / api/ post /:id
//@access   Private
const updateMyPost = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id)
    if(!post){
        res.status(400);
        throw new Error('Post not found');
    }

    const updatedPost = await Post.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(updatedPost);
})


export {
    getAllPost,
    getMyPost,
    deleteMyPost,
    getAPost,
    createAPost,
    createAComment,
    updateMyPost,
}