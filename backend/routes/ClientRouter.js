const express = require('express');
const router = express.Router();
// const Invoice = require('../models/Invoice');
const Client = require('../models/Client');

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

module.exports = router;

  