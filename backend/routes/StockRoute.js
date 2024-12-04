const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Add or Update Stock for a Date
router.post('/update', async (req, res) => {
  try {
    const { date, fruits } = req.body;

    // Ensure date and fruits are provided
    if (!date || !fruits || !Array.isArray(fruits)) {
      return res.status(400).json({ message: 'Date and fruits are required.' });
    }

    // Check if stock for the date already exists
    let stock = await Stock.findOne({ date });

    if (stock) {
      // Update existing stock
      stock.fruits = fruits;
    } else {
      // Create new stock entry
      stock = new Stock({ date, fruits });
    }

    await stock.save();
    res.status(200).json({ message: 'Stock updated successfully!', stock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Stock by Date
router.get('/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const stock = await Stock.findOne({ date });

    if (!stock) {
      return res.status(404).json({ message: 'No stock found for this date.' });
    }

    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Stock Entries
router.get('/all', async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ date: -1 });
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Fetch all stock
router.get('/find', async (req, res) => {
  try {
    const stocks = await Stock.find().lean();
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new stock entry
router.post('/create', async (req, res) => {
  try {
    const { date, fruits } = req.body;
    if (!date || !fruits || !fruits.length) {
      return res.status(400).json({ message: "Date and fruits are required" });
    }
    const newStock = new Stock({ date, fruits });
    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


module.exports = router;
