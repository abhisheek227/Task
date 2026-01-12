import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String
    },
    status : {
        type: String,
        enum: ["pending","in_progress","completed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low","medium","high"],
        default: "low"
    },
    due_date:{
        type: Date,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const Task = mongoose.model('Task',taskSchema);

export default Task;