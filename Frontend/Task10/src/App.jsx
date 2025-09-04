
import React, { useState } from "react";
import "./App.css";

// Import product images
import headphones from "./assets/Headphone.webp";
import watch from "./assets/Watch.jpg";
import shoes from "./assets/shoes.jpg";
import laptop from "./assets/laptop.jpeg";
import mouse from "./assets/GamingMouse.webp";
import speaker from "./assets/speaker.jpeg";
import camera from "./assets/camera.jpeg";
import chair from "./assets/chair.jpg";
import ps4 from "./assets/ps44.jpeg";
import tv from "./assets/tv.jpg";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    { id: 1, name: "Wireless Headphones", price: 1999, image: headphones },
    { id: 2, name: "Smart Watch", price: 2999, image: watch },
    { id: 3, name: "Running Shoes", price: 1499, image: shoes },
    { id: 4, name: "Gaming Laptop", price: 49999, image: laptop },
    { id: 5, name: "Gaming Mouse", price: 999, image: mouse },
    { id: 6, name: "Bluetooth Speaker", price: 1799, image: speaker },
    { id: 7, name: "DSLR Camera", price: 35999, image: camera },
    { id: 8, name: "Office Chair", price: 8999, image: chair },
    { id: 9, name: "PS4 Console", price: 29999, image: ps4 },
    { id: 10, name: "LED TV", price: 19999, image: tv },
  ];

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item, index) => index !== id));
  };

  // Total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2>MyShop 🛒</h2>
        <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
          Cart ({cart.length})
        </button>
      </nav>

      {/* Products */}
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      {showCart && (
        <div className="cart">
          <h3>Your Cart 🛍️</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>{item.name} - ₹{item.price}</span>
                  <button onClick={() => removeFromCart(index)}>❌</button>
                </div>
              ))}
              <h4>Total: ₹{totalPrice}</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;















