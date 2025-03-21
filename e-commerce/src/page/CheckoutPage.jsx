import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      Swal.fire({
        title: "Error",
        html: "Please fill all fields before proceeding.",
        icon: "warning",
        timer: 2000,
        timerProgressBar:true,
      });
      return;
    }

    // Simulate order confirmation
    Swal.fire(
      "Successfully Place Order",
      `Thank you, ${form.name}! Your order has been placed.`,
      "success"
    );

    // Clear cart after checkout
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-red-500">
          Your cart is empty. Add items before checkout.
        </p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Order Summary */}
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="text-right font-semibold mt-2">
            Total: ${totalPrice}
          </div>

          {/* Checkout Form */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={form.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

            {/* Payment Method */}
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg"
            >
              Place Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
