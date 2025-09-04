import React from "react";

function Navbar({ cartCount, setShowCart }) {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <h1
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => setShowCart(false)}
      >
        MyShop
      </h1>
      <button
        onClick={() => setShowCart(true)}
        className="relative bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
      >
        Cart
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-sm">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}

export default Navbar;

