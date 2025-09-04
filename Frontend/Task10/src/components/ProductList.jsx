const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_UL320_.jpg",
    },
  ];
  import React from "react";

  function ProductCard({ product, addToCart }) {
    return (
      <div className="card">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2>{product.name}</h2>
        <p>₹{product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    );
  }
  
  export default ProductCard;
    


