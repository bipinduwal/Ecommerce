import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // State to store order history
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Dummy order data
  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: "ORD12345",
          date: "2024-03-10",
          status: "Delivered",
          total: "Rs.199.99",
        },
        {
          id: "ORD67890",
          date: "2024-03-08",
          status: "Processing",
          total: "Rs.89.50",
        },
        {
          id: "ORD54321",
          date: "2024-03-05",
          status: "Cancelled",
          total: "Rs.45.00",
        },
      ]);
      setLoading(false);
    }, 1000); // Simulating API delay
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto mt-3 border">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Table */}
      {!loading && !error && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Order ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Orders Message */}
      {!loading && !error && orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
