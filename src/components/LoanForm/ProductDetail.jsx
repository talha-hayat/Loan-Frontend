import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto mt-[10%] p-6 animate-pulse">
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
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  // const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
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
    // console.log("Deleting product with ID:", id);
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

  const handleImageChange = async (e) => {
    // console.log("Image change");
    const file = e.target.files[0];
    setImage(file);
    // console.log("Selected file:", file);

  }

  const handleEdit = () => {
    // console.log("Editing product with ID:", id);
    setModalOpen(true);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl, // Assuming you handle image upload separately
    });

  }

  const handleSave = async (e) => {
    e.preventDefault();
      try {
        let imgUrl = null;
        const formdata = new FormData();
        formdata.append("key", image)
        const imageResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}upload`, formdata);
        imgUrl = imageResponse.data.ImageUrl;
        setImageUrl(imgUrl);
        // console.log("Image uploaded successfully:", imgUrl);
        setFormData({ ...formData, imageUrl: imgUrl });

      } catch (error) {
        console.error("Error handling image change:", error);
      }



    const updatedProduct = {
      ...product,
      name: formData.name || product.name,
      description: formData.description || product.description,
      price: formData.price || product.price,
      imageUrl: formData.imageUrl || product.imageUrl, // Assuming you handle image upload separately
    };
    // console.log("Saving product:", updatedProduct);
    try {
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}products/${id}`, updatedProduct);
      if (res.status === 200) {
        setProduct(res.data.product);
        // console.log("Product updated successfully:", res.data.product);
        setModalOpen(false);
        alert("Product updated successfully");
        // Optionally, you can redirect or refresh the product detail
        navigate(`/product/${id}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
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
            <button onClick={handleEdit} className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-200">
              Edit
            </button>
            <button onClick={handleDelete} className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200">
              Delete
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className=" fixed inset-0 bg-gradient-to-br from-black/70 to-gray-900/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className=" bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 rounded-xl shadow-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 border-b-2 border-green-500 pb-2">Edit Product</h2>
            <form>
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  defaultValue={product.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  defaultValue={product.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 h-20 sm:h-24 resize-none text-sm sm:text-base"
                ></textarea>
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  defaultValue={product.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4 sm:mb-6">
                <label htmlFor="image" className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div
                  className="border-2 border-dashed border-green-300 rounded-lg p-4 sm:p-6 text-center hover:border-green-500 transition duration-300 bg-gray-50 hover:bg-gray-100"
                >
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image" className="cursor-pointer">
                    {product.imagePreview ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={product.imagePreview}
                          alt="Preview"
                          className="h-32 sm:h-48 object-contain mb-2 sm:mb-4 rounded-lg shadow-md"
                        />
                        <span className="text-sm sm:text-md text-green-600 hover:text-green-800 font-medium transition duration-200">
                          Change image
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2 sm:space-y-4">
                        <svg
                          className="mx-auto h-12 sm:h-16 w-12 sm:w-16 text-green-400 hover:text-green-500 transition duration-200"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm sm:text-base text-gray-600 justify-center">
                          <span className="relative font-medium text-green-600 hover:text-green-500 transition duration-200">
                            Upload an image
                          </span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
                {/* {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>} */}
              </div>
            </form>
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4 sm:mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200 font-medium text-sm sm:text-base"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition duration-200 font-medium text-sm sm:text-base"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ProductDetail;