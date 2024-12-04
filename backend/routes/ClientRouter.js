const express = require('express');
const router = express.Router();
// const Invoice = require('../models/Invoice');
const Client = require('../models/Client');
const Invoice = require('../models/Invoice');

router.get('/all', async (req, res) => {
    try {
      const clients = await Client.find().populate('invoices');
      res.status(200).json(clients);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:name', async (req, res) => {
    try {
      const client = await Client.findOne({ name: req.params.name }).populate('invoices');
      if (!client) return res.status(404).json({ message: 'Client not found!' });
      res.status(200).json(client);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.get('/client', async (req, res) => {
    try {
      const clients = await Client.find({}, 'name'); // Only return names
      res.status(200).json(clients);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get invoices for a specific client
  router.get('/:clientId/invoices', async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const client = await Client.findById(clientId).populate('invoices');
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
  
      // Fetch invoices with only relevant fields
      const invoices = await Invoice.find(
        { _id: { $in: client.invoices } },
        'date total paid'
      );
  
      res.status(200).json({ clientName: client.name, invoices });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;

  