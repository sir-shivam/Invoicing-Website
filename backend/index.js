const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/invoices', invoiceRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: err.message });
});

// Start Server
const PORT = 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
