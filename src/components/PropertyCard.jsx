import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaBed, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';

export default function PropertyCard({ property }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // checking properties in favourite list
  const isFavorite = favorites.some(fav => fav.id === property.id);

  const toggleFavorite = (e) => {
    e.preventDefault(); //click the button then work
    if (isFavorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Property Image */}
      <div className="relative h-48">
        <img 
          src={property.images[0]} 
          alt={property.type} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 p-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full uppercase font-bold">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-2xl font-bold text-gray-800">£{property.price.toLocaleString()}</p>
            <p className="text-gray-500 text-sm flex items-center mt-1">
              <FaMapMarkerAlt className="mr-1" /> {property.location}
            </p>
          </div>
          {/* Favorite Button */}
          <button 
            onClick={toggleFavorite}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-500'
            }`}
          >
            {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
        </div>

        <div className="mt-4 flex items-center text-gray-600 text-sm">
          <FaBed className="mr-2 text-blue-500" />
          <span className="font-semibold mr-1">{property.bedrooms}</span> Bedrooms
          <span className="mx-2">|</span>
          <FaTag className="mr-2 text-green-500" />
          <span>{property.postcode}</span>
        </div>

        <p className="mt-3 text-gray-500 text-sm line-clamp-2">
          {property.description}
        </p>

        {/* View Details Button */}
        <Link 
          to={`/property/${property.id}`} 
          className="mt-4 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}