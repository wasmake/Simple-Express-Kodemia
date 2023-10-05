// Make mongoose schema for todo
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});
// Make mongoose model for todo
export const Todo = mongoose.model('Todo', todoSchema);