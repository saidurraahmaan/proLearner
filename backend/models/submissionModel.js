import mongoose from 'mongoose'


const submissionSchema = new mongoose.Schema({

    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    verdict: {
        type: String,
        required: true,

    },
}, {
    timestamps: true
})

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;