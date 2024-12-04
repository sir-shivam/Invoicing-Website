
const express = require('express');
const History = require('../models/History');
const router = express.Router();

router.get("/grouped-by-date", async (req, res) => {
  try {
    const history = await History.find()
  .populate("invoices.invoiceId") // Ensure invoiceId is populated
  .lean();
    // Group invoices by date
    const groupedHistory = history.reduce((acc, record) => {
      const date = record.date.toISOString().split("T")[0]; // Get YYYY-MM-DD format
      acc[date] = acc[date] || [];
      acc[date].push(...record.invoices);
      return acc;
    }, {});

    res.status(200).json(groupedHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  
  router.get("/history/date", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      const query = {};
      if (startDate) query.date = { $gte: new Date(startDate) };
      if (endDate) query.date = { ...query.date, $lt: new Date(endDate) };
  
      const history = await History.find(query).populate("invoices");
      res.status(200).json(history);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/history/:date", async (req, res) => {
    try {
      const { date } = req.params; // Expect date in 'YYYY-MM-DD' format
      const queryDate = new Date(date);
      queryDate.setHours(0, 0, 0, 0); // Normalize time to 00:00:00
  
      const history = await History.findOne({ date: queryDate }).populate("invoices.invoiceId");
  
      if (!history) {
        return res.status(404).json({ message: "No history found for this date!" });
      }
  
      res.status(200).json(history);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;
  
  