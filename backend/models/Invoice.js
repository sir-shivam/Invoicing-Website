const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    totalBills: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    dueAmount: { type: Number, required: true },
    receiptDetails: [{ date: Date, amount: Number }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
