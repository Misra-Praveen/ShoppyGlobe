import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useFetchProducts from '../customHooks/useFetchProducts';
import { addToCart } from '../redux/cartSlice';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

function ProductDetail() {
  // Get the product ID from the route parameter
  const { id } = useParams();

  // Hooks for navigation and dispatching actions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch the product details using a custom hook
  const { loading, error, data: product } = useFetchProducts(`https://dummyjson.com/products/${id}`);
  // Show loading indicator while fetching data
  if (loading) {
    return <p className="text-center text-blue-600 text-2xl animate-pulse">Loading...</p>;
  }
  // Show error message if API call fails
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Handle adding product to cart
  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <div className="p-6 max-w-5xl mx-auto my-14">
      {/* Back button to return to product list */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Products
      </button>
      {/* Product detail layout */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Product image */}
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 md:h-90 object-cover rounded"
          />
        </div>

        {/* Product info section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          <div className="flex items-center gap-2 text-yellow-500">
            <Star size={20} fill="currentColor" />
            <span className="text-base font-semibold text-gray-700">{product.rating} / 5</span>
          </div>

          <p className="text-2xl font-bold text-blue-600">${product.price}</p>

          <div className="bg-gray-100 p-4 rounded-lg text-gray-700">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p>{product.description}</p>
          </div>

          <p className="text-sm text-green-600 font-semibold">
            {product.availabilityStatus || 'In Stock'}
          </p>

          <div className="text-sm text-gray-500">Category: {product.category}</div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl flex items-center justify-center gap-2 transition active:scale-95"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
