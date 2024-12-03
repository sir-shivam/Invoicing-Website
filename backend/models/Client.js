const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phone: { type: String }, // Optional: Add phone number for the client
  invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }], // Array of invoice IDs
  balance : { type: Number, required: true, default: 0},
});

module.exports = mongoose.model('Client', clientSchema);
