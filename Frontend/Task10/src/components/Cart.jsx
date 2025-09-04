import React from "react";

function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item.name}</span>
                <span className="text-gray-600">₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg shadow-md">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;

