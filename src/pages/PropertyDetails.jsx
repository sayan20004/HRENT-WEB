import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../api/propertyService';
import { createRentalRequest } from '../api/rentalService';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requesting, setRequesting] = useState(false);
  const { id } = useParams();
  const { user, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await getPropertyById(id);
        setProperty(data.property);
      } catch (err) {
        setError('Property not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleRentalRequest = async () => {
    setRequesting(true);
    setError(null);
    try {
      await createRentalRequest(property._id);
      navigate('/my-requests');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send request.');
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && !property) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!property) return null;

  const isOwner = user && user._id === property.owner._id;

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{property.title}</h1>
      <p className="text-gray-600 text-lg mb-4">{property.address}</p>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-3xl font-bold text-indigo-600">
          ${property.price} / {property.pricingFrequency}
        </span>
        <span className="text-sm text-gray-500">
          Listed by: {property.owner.firstName} {property.owner.lastName}
        </span>
      </div>

      <p className="text-gray-700 mb-6">{property.description}</p>
      
      {property.allowBargaining && (
        <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-6">
          Bargaining Allowed
        </span>
      )}
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {user && !isOwner && userType === 'user' && (
        <button
          onClick={handleRentalRequest}
          disabled={requesting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {requesting ? 'Sending Request...' : 'Request to Rent'}
        </button>
      )}

      {isOwner && (
        <p className="text-center text-gray-600 font-medium">This is your property.</p>
      )}

      {!user && (
         <p className="text-center text-gray-600 font-medium">
           Please <Link to="/login" className="text-indigo-600 hover:underline">login</Link> to rent this property.
         </p>
      )}

    </div>
  );
};

export default PropertyDetails;