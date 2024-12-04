import React, { useRef } from "react";
import { jsPDF } from "jspdf";

const InvoicePage2 = ({ clientName, items }) => {
  const invoiceRef = useRef();

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    doc.html(invoiceRef.current, {
      callback: (pdf) => {
        pdf.save("invoice.pdf");
      },
      html2canvas: { scale: 0.8 }, // Adjust scale for better quality
    });
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  return (
    <div>
      <div ref={invoiceRef} className="invoice-container p-4 border bg-white">
        <div className="header text-center">
          <h1 className="text-2xl font-bold">INVOICE</h1>
          <p>Invoice Number: INV12345</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
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

      <button
        onClick={handleDownloadPDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download Invoice as PDF
      </button>
    </div>
  );
};

export default InvoicePage2;
