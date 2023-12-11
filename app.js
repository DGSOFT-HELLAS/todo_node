// server.js
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./controllers/todos');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
// Connect to MongoDB using Mongoose

mongoose.connect('mongodb+srv://giannis:123ccm@cluster0.m4tna3q.mongodb.net/todo');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use('/todos', todoRoutes);

