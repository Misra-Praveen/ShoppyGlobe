import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";

function ProductItem(props) {
  // Destructure props received from the parent component (ProductList)
  const { product, addToCart } = props; 

  return (
    <div className="bg-white border border-gray-300 rounded-2xl shadow-sm  transition-transform duration-300 hover:scale-95 flex flex-col">
      {/* Product Thumbnail with Link to Detail Page */}
      <Link to={`/products/${product.id}`} className="relative block">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="mx-auto w-64 p-2 h-48 object-cover"
        />

        {/* Availability Badge (Dynamic color based on stock) */}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${
          product.availabilityStatus === "In Stock"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}>
          {product.availabilityStatus}
        </span>
      </Link>

      {/* Product Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm mt-1">${product.price}</p>
{/* Link to View Details */}
        <Link
          to={`/products/${product.id}`}
          className="mt-3 text-sm text-blue-600 flex items-center gap-1 hover:underline"
        >
          View Details <ArrowRight size={16} />
        </Link>
      </div>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-95"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
