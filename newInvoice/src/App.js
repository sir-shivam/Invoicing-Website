import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import InvoicePage from "./components/Invoicepage";
import InvoicePage2 from "./components/Invoicenew";
import Loader from "./components/Loader/Loader";
import ClientsList from "./components/Client";
import InvoiceHistory from "./components/History";
import StockPage from "./components/Stocks";

function App () {
  
  return (
    <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/loader" element={<Loader />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/history" element={<InvoiceHistory />} />
              <Route path="/clients" element={<ClientsList />} />
              <Route path="/stock" element={<StockPage />} />

              <Route path="/invoice" element={<InvoicePage clientName={"Shivam"} items={[{ description: 'Apple', quantity: 1, price: 45 },
                { description: 'Apple', quantity: 1, price: 45 },
                { description: 'Apple', quantity: 1, price: 45 },
                { description: 'Apple', quantity: 1, price: 45 },
                { description: 'Apple', quantity: 1, price: 45 },
                { description: 'Apple', quantity: 1, price: 45 },
                { description: 'Apple', quantity: 1, price: 45 },
                { description: 'Apple', quantity: 1, price: 45 },
                { description: 'Apple', quantity: 1, price: 45 },
              ]} />} />
              <Route path="/report" element={<InvoicePage2 clientName={"Shivam"} items={[{ description: 'Apple', quantity: 1, price: 45 }]} />} />
            </Routes>
    </Router>
  )
}

export default App ;