import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Widget එකේ CSS
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function SearchFilter({ onSearch }) {
  // fome data state
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBeds: '',
    maxBeds: '',
    postcode: '',
    dateAdded: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFilters(prev => ({ ...prev, dateAdded: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters); // send data to search page
  };

  const clearFilters = () => {
    const reset = { type: 'any', minPrice: '', maxPrice: '', minBeds: '', maxBeds: '', postcode: '', dateAdded: null };
    setFilters(reset);
    onSearch(reset);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center mb-4 text-blue-600">
        <FaFilter className="mr-2" />
        <h2 className="text-xl font-bold">Filter Properties</h2>
      </div>

      <div className="space-y-4">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select 
            name="type" 
            value={filters.type} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="any">Any Type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
            <input 
              type="number" 
              name="minPrice" 
              placeholder="£0" 
              value={filters.minPrice} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
            <input 
              type="number" 
              name="maxPrice" 
              placeholder="Any" 
              value={filters.maxPrice} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Beds</label>
            <select name="minBeds" value={filters.minBeds} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Beds</label>
            <select name="maxBeds" value={filters.maxBeds} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Postcode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Postcode Area</label>
          <input 
            type="text" 
            name="postcode" 
            placeholder="e.g. BR1, NW1" 
            value={filters.postcode} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md uppercase"
          />
        </div>

        {/* Date Added Widget (React DatePicker) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Added After</label>
          <DatePicker 
            selected={filters.dateAdded} 
            onChange={handleDateChange} 
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholderText="Select Date"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-6">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center font-bold"
          >
            <FaSearch className="mr-2" /> Search
          </button>
          <button 
            type="button" 
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}