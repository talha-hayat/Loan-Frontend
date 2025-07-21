import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCardSkeleton = () => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white animate-pulse">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded-lg w-full mt-5"></div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, loading }) => {
  if (loading) {
    return <ProductCardSkeleton />;
  }

  const navigate = useNavigate();

  const navigatetodetail = (id) => {
    // console.log(id);
    navigate(`/product/${id}`);
  }
    

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
        <button onClick={()=>{navigatetodetail(product._id)}} className="px-4 py-2 mt-5 bg-green-500 text-white w-full text-sm font-medium rounded-lg hover:bg-green-600 transition-colors duration-200">
          See Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;