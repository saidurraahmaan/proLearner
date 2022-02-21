import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import languages from "./data/languages.js";
import topics from "./data/topics.js";
import problems from "./data/problems.js";
import User from "./models/userModel.js";
import Language from "./models/languageModel.js";
import Topic from "./models/topicModel.js";
import Problem from "./models/problemModel.js";
import connectDB from "./config/db.js";


dotenv.config();
await connectDB();

const importData = async ()=>{
    try{
        await Problem.deleteMany();
        await Topic.deleteMany();
        await Language.deleteMany();
        await User.deleteMany();

       const createdUsers =  await User.insertMany(users);
       const adminUser = createdUsers[0]._id;

       const sampleLanguages = languages.map(language=>{
           return {...language,user:adminUser};
       })
       const createdLanguages =  await Language.insertMany(sampleLanguages);

        // //Finding language
        // const languageId = createdLanguages[0]._id;
        //
        // const sampleTopics = topics.map(topic=>{
        //     return{...topic,languageId:languageId}
        // })
        //
        // const createdTopics =await Topic.insertMany(sampleTopics);
        //
        //
        // //Finding Topic
        // const topicOne = createdTopics[2]._id;
        //
        // const sampleProblems = problems.map(problem=>{
        //     return{...problem,topicId:topicOne};
        // })
        //
        // await Problem.insertMany(sampleProblems);




        console.log('Data Imported!!');
        process.exit();
    }catch (error) {
        console.error(error)
        process.exit();
    }
}

const destroyData = async ()=>{
    try{
        await Problem.deleteMany();
        await Topic.deleteMany();
        await Language.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!!');
        process.exit();
    }catch (error) {
        console.error(error)
        process.exit();
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}