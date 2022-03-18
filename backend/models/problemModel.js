import mongoose from 'mongoose'


const problemSchema = new mongoose.Schema({

    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    problemStatement: {
        type: String,
        required: true,
    },
    problemSampleInput: {
        type: String,

    },
    problemSampleOutput: {
        type: String,

    },
    constraints:{
        type:String,
        required:true,
    },

    additionalInput: {
        type: String,

    },
    additionalOutput: {
        type: String,
    },
    solutions:{
        type:String
    }
}, {
    timestamps: true
})

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;