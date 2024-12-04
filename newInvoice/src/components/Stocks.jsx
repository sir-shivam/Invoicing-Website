import React, { useEffect, useState } from "react";
import axios from "axios";
import { letGet } from "./Utility/Server";

function StockPage() {
  const [stocks, setStocks] = useState([]);
  const [formData, setFormData] = useState({ date: "", fruits: [] });
  const [fruit, setFruit] = useState({ name: "", quantity: 0, price: 0 });

  // Fetch all stock data
  const fetchStocks = async () => {
    try {
      const response = await letGet("/stocks/find")
      setStocks(response);
    } catch (err) {
      console.error("Error fetching stocks:", err.message);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/stocks/create", formData);
      setStocks([...stocks, response]); // Update stock list
      setFormData({ date: "", fruits: [] }); // Reset form
      setFruit({ name: "", quantity: 0, price: 0 }); // Reset fruit input
    } catch (err) {
      console.error("Error adding stock:", err.message);
    }
  };

  // Add a fruit to the list
  const addFruit = () => {
    setFormData((prevData) => ({
      ...prevData,
      fruits: [...prevData.fruits, fruit],
    }));
    setFruit({ name: "", quantity: 0, price: 0 }); // Reset fruit input
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Stock Management</h2>

      {/* Display Stock Data */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Stock List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border-b border-gray-300">Date</th>
                <th className="p-4 border-b border-gray-300">Fruits</th>
                <th className="p-4 border-b border-gray-300">Price</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock._id}>
                  <td className="p-4 border-b border-gray-200">
                    {new Date(stock.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    {stock.fruits.map((f) => (
                      <div key={f.name}>
                        {f.name} - {f.quantity} kg
                      </div>
                    ))}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    {stock.fruits.map((f) => (
                      <div key={f.name}>₹{f.price}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Stock */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Stock</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData((prevData) => ({ ...prevData, date: e.target.value }))
              }
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Fruit Name</label>
            <input
              type="text"
              value={fruit.name}
              onChange={(e) => setFruit((prev) => ({ ...prev, name: e.target.value }))}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Quantity (kg)</label>
            <input
              type="number"
              value={fruit.quantity}
              onChange={(e) => setFruit((prev) => ({ ...prev, quantity: +e.target.value }))}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price (₹)</label>
            <input
              type="number"
              value={fruit.price}
              onChange={(e) => setFruit((prev) => ({ ...prev, price: +e.target.value }))}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <button
            type="button"
            onClick={addFruit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Fruit
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
          >
            Save Stock
          </button>
        </form>
      </div>
    </div>
  );
}

export default StockPage;
