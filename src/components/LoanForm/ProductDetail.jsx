import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 h-96 bg-gray-300 rounded-2xl"></div>
        <div className="w-full md:w-1/2 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3 mt-4"></div>
          <div className="flex space-x-4">
            <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
            <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        // const response = await fetch(`your-api-endpoint/products/${id}`);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

    const handleDelete = async () => {
        console.log("Deleting product with ID:", id);
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}products/${id}`);
            if (res.status === 200) {
                alert("Product deleted successfully");
                navigate('/product'); // Redirect to product list after deletion        
            }

        } catch (error) {
            console.error("Error deleting product:", error); 
        }
    }

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mt-[10%] h-[100vh] mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          className="w-full md:w-1/2 h-96 object-cover rounded-2xl"
          src={product.imageUrl}
          alt={product.name}
        />
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{product.name}</h1>
          <p className="text-gray-600 text-base">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600">
            PKR {product.price.toLocaleString()}
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-200">
              Add to Cart
            </button>
            <button onClick={handleDelete} className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;