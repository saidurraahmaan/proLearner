import Problem from "../models/problemModel.js";
import asyncHandler from "express-async-handler";



//@desc     Fetch all problem of a topic
//@route    GET / api/ problem/all/:id
//@access   Public
const getAllTopicProblem = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const problems =await Problem.find({topicId: id});
    res.json(problems);
})

//@desc     Fetch all problem
//@route    GET / api /problem / :id
//@access   Public
const getATopicProblem = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const problem = await Problem.findById(id)

    res.json(problem);

})


//@desc     create Problem
//@route    GET / api/ problem/all/:id
//@access   Public
const createAProblem = asyncHandler(async (req,res)=>{
    const {problemData} =req.body;
    const {problemStatement,constraints,solutions} = problemData;
    if(!problemStatement || !solutions || !constraints ){
        res.status(400);
        throw new Error("Please add all fields");
    }
    const problem = new Problem(problemData);
    const createdProblem = await problem.save();
    res.status(201).json(createdProblem);
})

//@desc     Update Problem
//@route    PUT / api/ problem/update/:id
//@access   Public
const updateProblem = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const problem = await Problem.findById(id);
    if(!problem){
        res.status(401);
        throw new Error('Problem not found');
    }
    const {problemStatement,constraints,solutions} = req.body;

    if(!problemStatement || !solutions || !constraints ){
        res.status(400);
        throw new Error("Please add all fields");
    }
    const updatedProblem = await Problem.findByIdAndUpdate(id,req.body,{new:true});
    res.status(201).json(updatedProblem);
})

//@desc     create Problem
//@route    DELETE / api/ problem/delete/:id
//@access   Public
const deleteAProblem = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    let problem = await Problem.findById(id)
    if(!problem){
        res.status(400);
        throw new Error('Problem not found');
    }
    await problem.deleteOne();
    res.status(201).json({id:id});
})

export {
    getAllTopicProblem,
    getATopicProblem,
    createAProblem,
    updateProblem,
    deleteAProblem,
}