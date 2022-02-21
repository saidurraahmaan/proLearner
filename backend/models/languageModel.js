import mongoose from 'mongoose'

const languageSchema =new  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    topics:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Topic",
        },
    ]
}, {
    timestamps: true
})

const Language = mongoose.model('Language', languageSchema);
export default Language;
