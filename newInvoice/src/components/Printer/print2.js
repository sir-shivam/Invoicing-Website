export default function ThermalInvoice({ invoiceData }) {
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
  