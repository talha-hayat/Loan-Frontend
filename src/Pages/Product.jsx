import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/LoanForm/ProductCard";
import { div, input } from "framer-motion/client";
import SearchBar from "../components/LoanForm/SearchBar";

const Product = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageFile: null,
    imagePreview: "",
  });

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}products/`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProduct({
          ...product,
          imagePreview: event.target.result,
          imageFile: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!product.name.trim()) newErrors.name = "Product name is required";
    if (!product.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(product.price)) newErrors.price = "Price must be a number";
    if (!product.description.trim()) newErrors.description = "Description is required";
    // if (!product.imageFile) newErrors.image = 'Please select an image';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      try {
        let imgUrl = null;
        const formdata = new FormData();
        formdata.append("key", product.imageFile);
        const imageResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}upload`,
          formdata
        );
        imgUrl = imageResponse.data.ImageUrl;

        const finalData = {
          name: product.name,
          price: product.price,
          description: product.description,
          imageUrl: imgUrl,
        };

        const Response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}products/`,
          finalData
        );
        if (Response.status === 201) {
          console.log(Response.data);
          setProductData((prev) => [...prev, Response.data.product]);
          setIsModalOpen(false);
        } else {
          console.error("Error creating product");
          setErrors({ submit: "Failed to create product. Please try again." });
          return;
        }
        setTimeout(() => {
          console.log("Product submitted:", product);
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setProduct({
            name: "",
            price: "",
            description: "",
            imageFile: null,
            imagePreview: "",
          });

          setTimeout(() => setSubmitSuccess(false), 3000);
        }, 1500);
      } catch (error) {
        console.error("Error submitting product:", error);
        setIsSubmitting(false);
        setErrors({ submit: "Failed to create product. Please try again." });
        return;
      }
    }
  };

  const modal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = (value) => {
    setSearch(value);
    // console.log(search);   
  };

  const filteredProducts = productData.filter(product => (
    product.name.includes(search)

  ))



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      {!isModalOpen && (
        <div className="md:mt-[3%] mt-[8%]">
          {/* <SearchBar products={productData} onSearch={handleSearch} /> */}
          <div className="relative w-full max-w-md mx-auto mb-6 sm:mb-8 lg:max-w-full lg:mx-0">
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden transition-all duration-200 hover:border-green-500 focus-within:border-green-500">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {/* <button
                type="button"
                onClick={clearSearch}
                className={`px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 ${searchTerm ? "visible" : "invisible"}`}
                aria-label="Clear search"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button> */}
              <span className="px-3 py-2 text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

      )}

      {isModalOpen && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4 sm:py-5">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Create New Product</h1>
              <p className="mt-1 text-sm sm:text-base text-green-100">Add a new product to your catalog</p>
            </div>

            {/* Form content */}
            <div className="px-4 sm:px-6 py-5 sm:py-6">
              {submitSuccess && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm sm:text-base">
                  Product created successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Product Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border ${errors.name ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-green-500 focus:border-green-500"} focus:outline-none focus:ring-2 transition duration-200 text-sm sm:text-base`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  {/* Price */}
                  <div>
                    <label htmlFor="price" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                      Price ($)
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border ${errors.price ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-green-500 focus:border-green-500"} focus:outline-none focus:ring-2 transition duration-200 text-sm sm:text-base`}
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={product.description}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border ${errors.description ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-green-500 focus:border-green-500"} focus:outline-none focus:ring-2 transition duration-200 text-sm sm:text-base`}
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor="image" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                    Product Image
                  </label>
                  <div
                    className={`border-2 border-dashed ${errors.image ? "border-red-300" : "border-gray-300"} rounded-lg p-3 sm:p-4 text-center hover:border-green-500 transition duration-300 bg-gray-50 hover:bg-gray-100`}
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
                            className="h-32 sm:h-40 object-contain mb-2 sm:mb-3 rounded-lg shadow-md"
                          />
                          <span className="text-sm sm:text-base text-green-600 hover:text-green-800 transition duration-200">
                            Change image
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2 sm:space-y-3">
                          <svg
                            className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-gray-400 hover:text-green-500 transition duration-200"
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
                  {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-2 sm:py-3 px-4 sm:px-6 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      "Create Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Product Cards */}
      {!isModalOpen && (

        <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading ? (
            // Render skeleton cards while loading
            Array(8)
              .fill()
              .map((_, index) => (
                <ProductCard key={`skeleton-${index}`} loading={true} />
              ))
          ) 
          : 
          filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} loading={false} />
            ))
          ) 
          : 
          (
            <div className="col-span-full text-center text-gray-600 text-lg font-medium mt-4">
              Product not found
            </div>
          )}
        </div>
      )}
      <button onClick={modal} className="mt-6 sm:mt-8 fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:from-green-700 hover:to-green-800 transition duration-300 text-sm sm:text-base font-medium">
        {isModalOpen ? "Close Form" : "Add Product"}
      </button>
    </div>
  );
};

export default Product;