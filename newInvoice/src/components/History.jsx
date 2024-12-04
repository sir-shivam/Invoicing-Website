import React, { useEffect, useState } from "react";
import { letGet } from "./Utility/Server";

function InvoiceHistory() {
  const [history, setHistory] = useState({}); // Initialize as an object for grouped data
  const [loading, setLoading] = useState(false);

  // Fetch and group history data
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await letGet("/history/grouped-by-date");
      console.log(response);
      setHistory(response); // Directly use grouped data
    } catch (err) {
      console.error("Error fetching history:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Invoice History</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Object.keys(history).length === 0 ? (
        <p className="text-center">No history available.</p>
      ) : (
        Object.entries(history).map(([date, invoices]) => (
          <div key={date} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {new Date(date).toLocaleDateString()}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-4 border-b border-gray-300">Bill Number</th>
                    <th className="p-4 border-b border-gray-300">Client Name</th>
                    <th className="p-4 border-b border-gray-300">Items</th>
                    <th className="p-4 border-b border-gray-300">Bill Amount</th>
                    <th className="p-4 border-b border-gray-300 text-green-500 ">Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {(invoices || []).map((invoice, index) => (
                    <tr
                      key={invoice._id}
                      className={`hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="p-4 border-b border-gray-200">
                        {invoice.invoiceId.billNo || "N/A"}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        {invoice.invoiceId.clientName || "N/A"}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        {invoice.invoiceId.items?.length || 0}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        ₹ {invoice.invoiceId.total || 0}
                      </td>
                      <td className="p-4 border-b border-gray-200 text-blue-500">
                        ₹ {invoice.invoiceId.paid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default InvoiceHistory;
