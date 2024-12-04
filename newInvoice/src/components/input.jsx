import React, { useState } from 'react';

function App2() {
  const [items, setItems] = useState([
    { description: '', quantity: 1, price: 0 },
  ]);
  const fruitSuggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes', 'Orange'];

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <div>
      <label className="block font-medium">Invoice Items</label>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col space-y-1 mt-2">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              className="flex-1 p-2 border rounded"
              list={`fruits-${index}`} // Link to the datalist
            />
            <datalist id={`fruits-${index}`}>
              {fruitSuggestions
                .filter((fruit) =>
                  fruit.toLowerCase().includes(item.description.toLowerCase())
                )
                .map((fruit, i) => (
                  <option key={i} value={fruit} />
                ))}
            </datalist>
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value, 10))}
              className="w-20 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
              className="w-24 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 text-white bg-red-500 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Item
      </button>
    </div>
  );
}

export default App2;
