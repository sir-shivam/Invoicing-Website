import React from "react";

const InvoiceTemplate = ({ clientName, items, invoiceNumber, date }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  return (
    <div className="invoice-container p-4 border bg-white">
      <div className="header text-center">
        <h1 className="text-2xl font-bold">INVOICE</h1>
        <p>Invoice Number: {invoiceNumber}</p>
        <p>Date: {date}</p>
      </div>

      <div className="client-details mt-4">
        <p><strong>Client Name:</strong> {clientName}</p>
      </div>

      <div className="items mt-4">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Description</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.price.toFixed(2)}</td>
                <td className="border p-2">{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="total mt-4 text-right">
        <p className="text-xl"><strong>Total:</strong> ${calculateTotal()}</p>
      </div>

      <div className="footer mt-4 text-center">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
