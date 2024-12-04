const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const Client = require("../models/Client");
const History = require("../models/History");
const Stock = require("../models/Stock");


// Save a new invoice
router.post("/add", async (req, res) => {
  let savedInvoice = [];
  try {
    const {
      clientName,
      items,
      billNo,
      invoiceDate,
      balance,
      paid,
      notes,
      CommFare,
      total,
    } = req.body;

    // Format the invoice date to exclude time
    const formattedDate = new Date(invoiceDate);
    formattedDate.setHours(0, 0, 0, 0);

    // Check if an invoice for the client exists on the same date
    let existingInvoice = await Invoice.findOne({
      clientName,
      date: formattedDate,
    });

    if (existingInvoice) {
      // Update the existing invoice
      existingInvoice.items.push(...items); // Add new items to the existing invoice
      existingInvoice.balance = balance; // Update balance
      existingInvoice.paid += paid; // Add to the paid amount
      existingInvoice.total = total; // Update total
      existingInvoice.notes = notes || existingInvoice.notes; // Update notes if provided
      existingInvoice.CommFare = CommFare; // Update CommFare
      savedInvoice= await existingInvoice.save();

      // Update stock for the updated invoice
      let stock = await Stock.findOne({ date: formattedDate });

      if (!stock) {
        stock = new Stock({
          date: formattedDate,
          fruits: [],
        });
      }

      items.forEach((item) => {
        const fruitExists = stock.fruits.some(
          (fruit) => fruit.name === item.description
        );

        if (!fruitExists) {
          stock.fruits.push({ name: item.description, quantity: 0 });
        }
      });

      await stock.save();

      // Update the day's history
      let history = await History.findOne({ date: formattedDate });

      if (!history) {
        history = new History({ date: formattedDate, invoices: [] });
      }

      history.invoices.push({
        invoiceId: existingInvoice._id,
        createdAt: new Date(),
      });

      await history.save();

      // return res.status(200).json({
      //   message: "Invoice updated successfully!",
      //   invoice: existingInvoice,
      // });
    } else{


    // Create a new invoice if none exists
    const invoice = new Invoice({
      clientName,
      items,
      billNo,
      date: formattedDate,
      balance,
      paid,
      notes,
      CommFare,
      total,
    });

     savedInvoice = await invoice.save();
  }


    // Find or create the client
    let client = await Client.findOne({ name: clientName });
    if (!client) {
      client = new Client({ name: clientName, invoices: [] });
    }


    client.invoices.push(savedInvoice._id);
    client.balance = (total - paid)// Update balance
    await client.save();

    // Check for stock presence or create a new stock entry
    let stock = await Stock.findOne({ date: formattedDate });

    if (!stock) {
      stock = new Stock({
        date: formattedDate,
        fruits: [],
      });
    }

    items.forEach((item) => {
      const fruitExists = stock.fruits.some(
        (fruit) => fruit.name === item.description
      );

      if (!fruitExists) {
        stock.fruits.push({ name: item.description, quantity: 0 });
      }
    });

    await stock.save();

    // Update or create history
    let history = await History.findOne({ date: formattedDate });

    if (!history) {
      history = new History({ date: formattedDate, invoices: [] });
    }

    history.invoices.push({
      invoiceId: savedInvoice._id,
      createdAt: new Date(),
    });

    await history.save();

    res.status(201).json({
      message: "Invoice saved successfully!",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
;
;

// Get all invoices
router.get("/all", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific invoice by bill number
router.get("/:billNumber", async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      billNumber: req.params.billNumber,
    });
    if (!invoice)
      return res.status(404).json({ message: "Invoice not found!" });
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
