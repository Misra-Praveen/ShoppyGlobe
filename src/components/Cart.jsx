import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../redux/cartSlice";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  // total sum of product price that are added in cart
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="p-6 max-w-5xl mx-auto my-14">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <ShoppingCart className="text-blue-600" size={32} />
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-gray-100 p-10 text-center rounded-2xl shadow-sm">
          <p className="text-gray-500 text-lg mb-4">🛒 Your cart is currently empty.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mt-2 transition"
          >
            Back to Shop
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Total + Actions */}
          <div className="mt-10 bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-200">
            <p className="text-2xl font-semibold text-gray-700">
              Total: <span className="text-blue-600">${total}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-sm"
              >
                <Trash2 size={18} />
                Clear Cart
              </button>

              <Link
                to="/checkout"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition shadow-sm"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
