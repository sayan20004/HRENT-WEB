import React, { useState, useEffect } from 'react';
import { getMyProperties } from '../api/propertyService';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await getMyProperties();
        setProperties(data.properties);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Link 
          to="/create-property" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          + List New Property
        </Link>
      </div>
      <div className="space-y-4">
        {properties.length === 0 ? (
          <p>You have not listed any properties.</p>
        ) : (
          properties.map((prop) => (
            <div key={prop._id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{prop.title}</h2>
                <p className="text-gray-600">{prop.address}</p>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${prop.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {prop.status}
                </span>
              </div>
              <Link to={`/property/${prop._id}`} className="text-indigo-600 hover:underline">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProperties;