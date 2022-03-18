import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({

    languageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
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
    content: {
        type: String,
        required: true,
    },
    video:{ type:String },

    problems:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Problem'
        }
    ]
}, {
    timestamps: true
})

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;
