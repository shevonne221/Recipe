const express = require('express');
const router = express.Router();
const Recipe = require('./recipe') // Import Recipe model

// GET route: Fetch all recipes
router.get('/recipe', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST route: Add a new recipe
router.post('/recipe', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body); // req.body contains recipe data
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET route: Fetch a single recipe by ID
router.get('/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT route: Update a recipe by ID
router.put('/recipe/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE route: Delete a recipe by ID
router.delete('/recipe/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
