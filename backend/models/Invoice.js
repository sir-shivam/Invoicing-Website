const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number , required : true},
  price: { type: Number , required : true },
});

const invoiceSchema = new mongoose.Schema({
  billNo: { type: String, required: true },
  clientName: { type: String, required: true },
  items: [itemSchema],
  CommFare: { type: Number, default: 0},
  paid: {type: Number, default: 0},
  balance: {type: Number, default: 0},
  date: { type: Date, default: Date.now },
  total: {type: Number, require: true , default : 0}
});

module.exports = mongoose.model('Invoice', invoiceSchema);
