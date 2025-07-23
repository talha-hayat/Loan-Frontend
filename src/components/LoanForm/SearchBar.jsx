import React, { useState } from "react";

const SearchBar = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Filter products based on search term (case-insensitive)
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    onSearch(filteredProducts); // Pass filtered results to parent
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch(products); // Reset to original list
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-6 sm:mb-8 lg:max-w-full lg:mx-0">
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden transition-all duration-200 hover:border-green-500 focus-within:border-green-500">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
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
        </button>
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
  );
};

export default SearchBar;