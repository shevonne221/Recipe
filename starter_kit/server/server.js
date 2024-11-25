const express = require('express');
const app = express();
const mongoose = require('mongoose');
const recipeRouter = require('./routes'); // Import the router
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Define a route
app.get('/', (req, res) => {
    res.send('Welcome to the Recipe Server!');
});

mongoose.connect('mongodb://localhost:27017/recipeDatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', recipeRouter); // All routes will be prefixed with '/api'

// Start the server on port 8001
const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
