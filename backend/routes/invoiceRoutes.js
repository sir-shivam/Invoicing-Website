const express = require('express');
const Invoice = require('../models/Invoice');

const router = express.Router();

// Create a new invoice
router.post('/create', async (req, res) => {
    const { clientName, totalBills, paidAmount } = req.body;
    const dueAmount = totalBills - paidAmount;

    try {
        const invoice = new Invoice({
            clientName,
            totalBills,
            paidAmount,
            dueAmount,
        });
        await invoice.save();
        res.status(201).json({ success: true, invoice });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get all invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json({ success: true, invoices });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update an invoice
router.put('/:id', async (req, res) => {
    const { paidAmount } = req.body;

    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) throw new Error('Invoice not found');

        invoice.paidAmount += paidAmount;
        invoice.dueAmount -= paidAmount;
        invoice.receiptDetails.push({ date: new Date(), amount: paidAmount });

        await invoice.save();
        res.status(200).json({ success: true, invoice });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete an invoice
router.delete('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) throw new Error('Invoice not found');
        res.status(200).json({ success: true, message: 'Invoice deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
