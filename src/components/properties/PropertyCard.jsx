import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div className="flex flex-col cursor-pointer">
      <div className="relative">
        
        {/* This is the new fixed-square container.
          - `relative` lets us position the image inside.
          - `pt-[100%]` makes the height equal to 100% of the width, creating a perfect square.
        */}
        <div className="relative w-full overflow-hidden rounded-xl bg-gray-200 pt-[100%]">
          <img
            src={property.images[0]}
            alt={property.title}
            // These classes position the image inside the square container and force it to cover
            className="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:opacity-75"
          />
        </div>

        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 text-white text-2xl z-10"
        >
          {liked ? (
            <FaHeart className="text-red-500 drop-shadow-lg" />
          ) : (
            <FaRegHeart className="drop-shadow-lg" />
          )}
        </button>
      </div>

      <Link to={`/property/${property._id}`} className="mt-3">
        <div className="flex justify-between items-start">
          <h3 className="text-md font-medium text-gray-900 truncate">
            {property.title}
          </h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">{property.address}</p>
        <p className="text-sm text-gray-500 mt-1">Jan 10 - 15</p>
        <p className="mt-2">
          <span className="text-md font-semibold text-gray-900">
            ${property.price}
          </span>
          <span className="text-sm text-gray-700"> / {property.pricingFrequency}</span>
        </p>
      </Link>
    </div>
  );
};

export default PropertyCard;