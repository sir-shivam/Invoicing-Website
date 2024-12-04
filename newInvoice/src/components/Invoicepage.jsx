import React from "react";
import InvoiceTemplate from "./InvoiceTemplate";
import PrintInvoicePage from "./Printer/print";

const InvoicePage = ({ clientName, items }) => {
  const invoiceNumber = "INV12345";
  const date = new Date().toLocaleDateString();

  const handlePrint = () => {
    window.print();
  };

  const invoiceData = {
    clientName: 'John Doe',
    billNo: 'INV123',
    items: [
      { description: 'Apple', quantity: 5, price: 10 },
      { description: 'Mango', quantity: 3, price: 20 },
    ],
  };

  return (
    <div className="p-4">
      <InvoiceTemplate
        clientName={clientName}
        items={items}
        invoiceNumber={invoiceNumber}
        date={date}
      />
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Print Invoice
      </button>

      <PrintInvoicePage invoiceData={invoiceData} />
    </div>
  );
};

export default InvoicePage;




// Render Print Invoice Page

