import mongoose from 'mongoose'


const problemSchema = new mongoose.Schema({

    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
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
        required: true,
    },
    problemSampleOutput: {
        type: String,
        required: true,
    },
    constraints:{
        type:String,
        required:true,
    },

    // problemExtraInput: {
    //     type: String,
    //     required: true,
    // },
    // problemExtraOutput: {
    //     type: String,
    //     required: true,
    // },
    solutions:{
        type:String
    }
}, {
    timestamps: true
})

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;