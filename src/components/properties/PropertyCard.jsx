import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/property/${property._id}`}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
          <p className="text-gray-600 mt-1">{property.address}</p>
          <p className="text-lg font-semibold text-indigo-600 mt-2">
            ${property.price} / {property.pricingFrequency}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;