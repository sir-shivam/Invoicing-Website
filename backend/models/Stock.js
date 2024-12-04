const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  fruits: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true }, // Quantity in kg or cartons
      price: {type: Number}
    },
  ],
});

module.exports = mongoose.model('Stock', stockSchema);
