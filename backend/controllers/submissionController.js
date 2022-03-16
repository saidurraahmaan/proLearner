import Problem from "../models/problemModel.js";
import asyncHandler from 'express-async-handler'
import axios from 'axios';

//@desc     Get Verdict
//@route    POST / api/ submission/
//@access   Private
const getVerdict1 = asyncHandler(async (req,response)=>{
    const {source_code,language,input,expected_output} = req.body;

    axios
        .post('http://142.93.220.149/api/api.php',{source_code,language,input,expected_output})
        .then(res=>{
            console.log(res)
        })
    response.json("Hello");
})
//@desc     Get Verdict
//@route    POST / api/ submission/
//@access   Private
const getVerdict2 = asyncHandler(async (req,response)=>{
    const {source_code,language,input,expected_output} = req.body;

    axios
        .post('http://142.93.220.149/api/api.php',{source_code,language,input,expected_output})
        .then(res=>{
            console.log(res)
        })
    response.json("Accepted");
})
export {
    getVerdict1,
    getVerdict2
}