import React, { useState, useEffect } from 'react';
import { getMyRentalRequests, updateRentalStatus } from '../api/rentalService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await getMyRentalRequests();
      setRequests(data.rentals);
    } catch (err) {
      setError('Failed to fetch requests.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateStatus = async (id, status) => {
    try {
      await updateRentalStatus(id, status);
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'denied':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'cancellationRequested':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Rental Requests</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p>You have not made any rental requests.</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{req.property.title}</h2>
                <p className="text-gray-600">Owner: {req.owner.firstName} {req.owner.lastName}</p>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusClass(req.status)}`}>
                  {req.status}
                </span>
              </div>
              <div className="space-x-2">
                {req.status === 'pending' && (
                  <button 
                    onClick={() => handleUpdateStatus(req._id, 'cancelled')}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                )}
                {req.status === 'accepted' && (
                  <button 
                    onClick={() => handleUpdateStatus(req._id, 'cancellationRequested')}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Request Cancellation
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRequests;