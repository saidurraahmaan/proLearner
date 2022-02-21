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


//@desc     create Topic
//@route    GET / api/ problem/all/:id
//@access   Public
const createAProblem = asyncHandler(async (req,res)=>{
    const {problemData} =req.body;
    const problem = new Problem(problemData);
    const createdProblem = await problem.save();
    res.status(201).json(createdProblem);
})

export {
    getAllTopicProblem,
    getATopicProblem,
    createAProblem,
}