import React, { useState, useEffect } from 'react';
import { letGet } from './Utility/Server';
import Loader from './Loader/Loader';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all clients on load
  useEffect(() => {
    const letFetch = async () => {
      setLoading(true);
      try {
        const response = await letGet('/clients/all');
        setClients(response);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };
    letFetch();
  }, []);

  // Fetch invoices when a client is selected
  const fetchInvoices = async (clientId) => {
    setLoading(true);
    try {
      const response = await letGet(`/clients/${clientId}/invoices`);
      setSelectedClient(response.clientName);
      setInvoices(response.invoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <Loader />}
      <h1 className="text-2xl font-bold text-center mb-6">Clients</h1>

      {/* Clients List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Client List</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <li
              key={client._id}
              className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-4 rounded shadow cursor-pointer"
              onClick={() => fetchInvoices(client._id)}
            >
              <span className="font-medium text-gray-800">{client.name}</span>
              <span
                className={`font-semibold ${
                  client.balance < 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                ₹{client.balance.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Invoices Table */}
      {selectedClient && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Invoices for <span className='text-blue-500'> {selectedClient}</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Total</th>
                  <th className="border border-gray-300 p-2 text-left">Paid</th>
                  {/* <th className="border border-gray-300 p-2 text-left">
                    Balance
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ₹{invoice.total.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2 text-green-500 font-semibold">
                      ₹{invoice.paid}
                    </td>
                    {/* <td
                      className={`border border-gray-300 p-2 ${
                        invoice.balance < 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      } font-medium`}
                    >
                      ₹{invoice.balance}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsList;
