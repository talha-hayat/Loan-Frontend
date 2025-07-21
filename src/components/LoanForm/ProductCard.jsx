import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-64 object-cover"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 capitalize">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            PKR {product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
