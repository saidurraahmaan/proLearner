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

//@desc     create Topic
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
    getATopic,
    createATopic,
    updateTopic,
}