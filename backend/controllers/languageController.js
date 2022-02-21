import Language from "../models/languageModel.js";
import asyncHandler from "express-async-handler";

//@desc     Fetch all language
//@route    GET / api / languages
//@access   Public
const getLanguages = asyncHandler(async (req,res)=>{
    const languages =await Language.find({});
    res.json(languages);
})


//@desc     Fetch single language
//@route    GET / api / languages/:id
//@access   Public
const getLanguageById = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    const language = await Language.findById(id);
    if(language){
        res.json(language);
    }else{
        res.status(404)
        throw new Error('Language not found');
    }
})

export {
    getLanguageById,
    getLanguages,
}