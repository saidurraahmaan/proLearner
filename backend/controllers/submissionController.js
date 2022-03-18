
import asyncHandler from 'express-async-handler'
import axios from 'axios';
import Submission from "../models/submissionModel.js";

//@desc     Get Verdict
//@route    POST / api/ submission/
//@access   Private
const getVerdict = asyncHandler(async (req,response)=>{
    const {source_code,language,input,expected_output} = req.body;

    axios
        .post('http://142.93.220.149/api/api.php',{source_code,language,input,expected_output})
        .then(res=>{
            console.log(res)
        })
    response.json("Hello");
})
//@desc     Post Submission
//@route    POST / api/ submission/
//@access   Private
const postSubmission = asyncHandler(async (req,res)=>{
    const submission = new Submission(req.body);

    const createdSubmission = await submission.save();
    res.status(201).json(createdSubmission);
})

//@desc     GEt Submission
//@route    POST / api/ submission/
//@access   Private
const getMySubmission = asyncHandler(async(req,res)=>{
    const AC = await Submission.countDocuments({
        userId:req.user._id,
        verdict:"Accepted"
    })
    const WA = await Submission.countDocuments({
        userId:req.user._id,
        verdict:"Wrong Answer"
    })
    const CE = await Submission.countDocuments({
        userId:req.user._id,
        verdict:"Compilation Error"
    })
    const RE = await Submission.countDocuments({
        userId:req.user._id,
        verdict:"Runtime Error (NZEC)"
    })
    res.status(201).json({AC,WA,RE,CE});
})
export {
    getVerdict,
    postSubmission,
    getMySubmission,
}