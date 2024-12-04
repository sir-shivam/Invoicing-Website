const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true }, // Store only the date part with time set to 00:00:00
  invoices: [
    {
      invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
      createdAt: { type: Date, default: Date.now }, // Include actual creation time
    },
  ],
});

module.exports = mongoose.model("History", historySchema);
