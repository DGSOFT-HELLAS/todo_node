// routes/todos.js
const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Todo = require('../models/Todo')
// Create a todo
router.post('/', async (req, res) => {
  const { data } = req.body;
  const result = [];
  for (let item of data) {
    let createdItem = await createTodo(item);
    result.push(createdItem);
  }

  async function createTodo(item) {
    try {
      let result = await Todo.create(item);
      return { ...result._doc, success: true};
    } catch (error) {
      return {data: null, success: false};
    }
   
  }

  try {
   
    res.status(201).json({
      success: true,
      data: result,
      totalCreated: result.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read one todo
router.get('/:id', async (req, res) => {
  console.log('get one')
  console.log(req.params.id)
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
    });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  try {

    
    const todo = await Todo.findByIdAndUpdate({_id: req.params.id }, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/generateTodos', async (req, res) => {})
module.exports = router;
