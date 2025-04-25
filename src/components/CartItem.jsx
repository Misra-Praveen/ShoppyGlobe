import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import { Minus, Plus } from 'lucide-react';

function CartItem(props) {
  const dispatch = useDispatch();
  const { id, title, thumbnail, price, quantity } = props.item;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between  p-4 rounded-xl mb-4 shadow hover:shadow-md transition">
      {/* Left: Image & Info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img
          src={thumbnail}
          alt={title}
          className="w-24 h-24 object-cover rounded-lg border"
        />
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-blue-600 font-medium">${price}</p>
        </div>
      </div>

      {/* Right: Quantity Controls */}
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <button
          onClick={() => dispatch(removeFromCart({ id }))}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
        >
          <Minus size={16} />
        </button>
        <span className="text-md font-semibold text-gray-700">{quantity}</span>
        <button
          onClick={() => dispatch(addToCart(props.item))}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
