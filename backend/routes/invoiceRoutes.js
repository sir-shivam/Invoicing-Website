const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Client = require('../models/Client');

// Save a new invoice
router.post('/add', async (req, res) => {
  try {
    const { billNumber, clientName, items } = req.body;

    // Create a new invoice
    const invoice = new Invoice({ billNumber, clientName, items });
    const savedInvoice = await invoice.save();

    // Find or create the client
    let client = await Client.findOne({ name: clientName });
    if (!client) {
      client = new Client({ name: clientName, invoices: [] });
    }

    // Add the invoice ID to the client's invoices list
    client.invoices.push(savedInvoice._id);
    await client.save();

    res.status(201).json({ message: 'Invoice saved successfully!', invoice: savedInvoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all invoices
router.get('/all', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific invoice by bill number
router.get('/:billNumber', async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ billNumber: req.params.billNumber });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found!' });
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
