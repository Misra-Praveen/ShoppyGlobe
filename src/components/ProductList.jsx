import React, { useState } from "react";
import ProductItem from "./ProductItem";
import useFetchProducts from "../customHooks/useFetchProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductList() {
  const dispatch = useDispatch(); 

  // API endpoint for fetching product data
  const url = "https://dummyjson.com/products";
  const { data, loading, error } = useFetchProducts(url); // Custom hook for fetching data

  const [searchInput, setSearchInput] = useState(''); // State for the search input
  
   // Get the products array from the API response
  const products = data?.products || [];

  // Filter products based on the search input (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  // Decide which products to show: all or filtered
  const displayProducts = searchInput.trim() ? filteredProducts : products;

  // Handler function: when "Add to Cart" is clicked   
  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }

  // Show loading message while data is being fetched
  if (loading) {
    return (
      <p className="text-center text-blue-600 text-2xl">Loading...</p>
    );
  }
   // Show error message if data fetching fails
  if (error) {
    return (
      <p className="text-center text-red-500">
        Error: {error.message || "Something went wrong"}
      </p>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto mb-14 mt-16">
      {/* Search Input Field */}
      <div className="mb-6 text-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for products..."
          className="border border-gray-300 shadow-md shadow-gray-400 p-3 w-full md:w-1/2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              addToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
