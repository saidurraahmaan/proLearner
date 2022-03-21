import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
        name: { type: String, required: true },
        comment: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)


const postSchema = new mongoose.Schema({
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
    comments:[commentSchema]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);
export default Post;
