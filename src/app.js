import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import express from 'express';
import cors from 'cors';

import { Todo } from './todo.js';
import { todos } from './dataset.js';

const app = express();

const mongoServer = await MongoMemoryServer.create();
const mongoUri = mongoServer.getUri();

app.use(express.json());
// Configure cors *
app.use(cors());

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
    }
);

app.delete('/todo/:id', async (req, res) => {
    const todos = await Todo.findByIdAndDelete(req.params.id);
    res.json(todos);
    }
);

app.post('/todo', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        completed: req.body.completed,
    });
    await todo.save();
    res.json(todo);
});

app.put('/todo/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }

    todo.title = req.body.title;
    todo.completed = req.body.completed;
    await todo.save();

    res.json(todo);
}
);

// Connect to MongoDB inside app listen callback
app.listen(5000, async () => {
  await mongoose.connect(mongoUri);
  console.log('Listening on port 5000');

    // Insert sample todos into MongoDB
    await Todo.insertMany(todos);
    console.log('Sample todos inserted');
    
});