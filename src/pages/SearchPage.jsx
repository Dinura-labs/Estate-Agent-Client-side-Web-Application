import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter'; // අලුත් Filter එක
import propertiesData from '../data/properties.json';
import { useFavorites } from '../context/FavoritesContext';

export default function SearchPage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const { favorites } = useFavorites();

  // first load all datas
  useEffect(() => {
    setProperties(propertiesData);
    setFilteredProperties(propertiesData);
  }, []);

  // Filter කරන Logic එක (Search Engine එක)
  const handleSearch = (filters) => {
    let result = properties;

    // 1. Type Filter
    if (filters.type !== 'any') {
      result = result.filter(p => p.type === filters.type);
    }

    // 2. Price Filter
    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseInt(filters.maxPrice));
    }

    // 3. Bedrooms Filter
    if (filters.minBeds) {
      result = result.filter(p => p.bedrooms >= parseInt(filters.minBeds));
    }
    if (filters.maxBeds) {
      result = result.filter(p => p.bedrooms <= parseInt(filters.maxBeds));
    }

    // 4. Postcode Filter
    if (filters.postcode) {
      const searchPostcode = filters.postcode.toLowerCase().trim();
      result = result.filter(p => p.postcode.toLowerCase().includes(searchPostcode));
    }

    // 5. Date Filter (Added After)
    if (filters.dateAdded) {
      const filterDate = new Date(filters.dateAdded);
      result = result.filter(p => new Date(p.dateAdded) >= filterDate);
    }

    setFilteredProperties(result);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl min-h-screen">
      
      {/* Header */}
      <div className="mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find Your Dream Home</h1>
        <p className="text-blue-100 text-lg">Search properties for sale in London</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/*  Search Filter */}
        <div className="w-full lg:w-1/4 h-fit sticky top-4">
          <SearchFilter onSearch={handleSearch} />
          
          {/* Favourites Preview */}
          {favorites.length > 0 && (
            <div className="mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm">
              <h3 className="font-bold text-yellow-800 mb-2">My Favorites ({favorites.length})</h3>
              <p className="text-sm text-yellow-700">Drag items here to save!</p>
              {/* Drag */}
            </div>
          )}
        </div>

        {/*  Results */}
        <div className="w-full lg:w-3/4">
          
          {/* Results Count */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Showing {filteredProperties.length} Properties
            </h2>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No properties match your search.</p>
              <button onClick={() => window.location.reload()} className="mt-4 text-blue-600 font-semibold hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}