import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { CheckCircle } from 'lucide-react';

function Checkout() {
  // Redux hooks to get cart items and dispatch actions
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Local state for form inputs and order success status
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setOrderPlaced(true);
    dispatch(clearCart());

    // Reset form
    setFormData({
      name: '',
      email: '',
      address: ''
    });
  }

// Automatically hide the success message after a few seconds
  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => setOrderPlaced(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [orderPlaced]);

  return (
    <div className="p-6 max-w-3xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">🧾 Checkout</h1>
      
      {/* Success Message */}
      {orderPlaced && (
        <div className="flex items-center gap-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 transition-all duration-300">
          <CheckCircle className="text-green-600" size={24} />
          <span className="font-medium">🎉 Order placed successfully!</span>
        </div>
      )}
      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">🛍️ Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2 text-sm text-gray-600">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="text-lg font-bold mt-4 text-right text-blue-700">Total: ${total}</p>
      </div>

        {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-700">📦 Shipping Details</h2>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          type="text"
          placeholder="Shipping Address"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
