import Topic from "../models/topicModel.js";
import asyncHandler from "express-async-handler";


//@desc     Fetch all topics
//@route    GET / api/ topic/ all/ :id
//@access   Public
const getAllTopics = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const topics =await Topic.find({languageId: id});

    res.json(topics);
})

//@desc     Fetch User all topics
//@route    GET / api/ topic/ all/ :id
//@access   Private
const getMyTopics = asyncHandler(async(req,res)=>{

    const topics =await Topic.find({userId: req.user._id});
    res.json(topics);
})

//@desc     Fetch User all topics
//@route    DELETE / api/ topic/ delete/ :id
//@access   Private
const deleteMyTopic = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    let topic = await Topic.findById(id)
    if(!topic){
        res.status(400);
        throw new Error('Topic not found');
    }

    if(req.user._id.toString() === topic.userId.toString()){
        await topic.deleteOne();
        res.status(201).json({id:id});
        return;
    }
    res.status(401)
    throw new Error('Not authorized')


})

//@desc     Fetch all topics
//@route    GET / api /topic / :id
//@access   Public
const getATopic = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const topic = await Topic.findById(id);
    res.json(topic);
})

//@desc     create Topic
//@route    GET / api/ topic/ all/ :id
//@access   Public
const createATopic = asyncHandler(async (req,res)=>{
    const {topicData} =req.body;
    const topic = new Topic(topicData);
    const createdTopic = await topic.save();
    res.status(201).json(createdTopic);
})

//@desc     Update Topic
//@route    put / api/ topic/ all/ :id
//@access   Public
const updateTopic = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const topic = await Topic.findById(id)
    if(!topic){
        res.status(400);
        throw new Error('Topic not found');
    }

    const updatedTopic = await Topic.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(updatedTopic);
})

export {
    getAllTopics,
    getMyTopics,
    deleteMyTopic,
    getATopic,
    createATopic,
    updateTopic,
}