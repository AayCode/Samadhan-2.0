import React from "react";

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {product.name}
      </h2>
      <p className="text-red-600 font-bold text-xl mb-3">₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;













