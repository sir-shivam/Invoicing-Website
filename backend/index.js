const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const invoiceRoutes = require('./routes/invoiceRoutes');
const clientRoutes = require('./routes/ClientRouter')
const stockRoutes = require("./routes/StockRoute");
const historyRoutes = require("./routes/HistoryRoute");
const app = express();


const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");


// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/invoices', invoiceRoutes);
app.use('/api/clients', clientRoutes );
app.use('/api/stocks', stockRoutes);
app.use('/api/history', historyRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: err.message });
});

// Start Server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));