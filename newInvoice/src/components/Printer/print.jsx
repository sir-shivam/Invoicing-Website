import React from 'react';
import "./print.css";

function ThermalInvoice({ invoiceData }) {
  return (
    <div id="thermal-invoice" className="thermal-invoice">
      <h1>INVOICE</h1>
      <h2>Client: {invoiceData.clientName}</h2>
      <h3>Bill No: {invoiceData.billNo}</h3>
      <div className="items">
        {invoiceData.items.map((item, index) => (
          <div key={index}>
            {item.description} - {item.quantity} x ₹{item.price}
          </div>
        ))}
      </div>
      <div className="total">
        Total: ₹{invoiceData.items.reduce((total, item) => total + item.price * item.quantity, 0)}
      </div>
    </div>
  );
}

function PrintInvoicePage({ invoiceData }) {
  const handlePrint = () => {
    const printContent = document.getElementById('thermal-invoice').innerHTML;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .thermal-invoice {
                width: 58mm; /* Adjust for your thermal printer */
                font-family: 'Courier New', Courier, monospace;
                font-size: 12px;
                line-height: 1.4;
              }
              .items { border-top: 1px dashed #000; border-bottom: 1px dashed #000; margin: 10px 0; }
              .total { text-align: right; font-weight: bold; }
            }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div>
      <ThermalInvoice invoiceData={invoiceData} />
      <button onClick={handlePrint} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Print Invoice
      </button>
    </div>
  );
}

export default PrintInvoicePage;
