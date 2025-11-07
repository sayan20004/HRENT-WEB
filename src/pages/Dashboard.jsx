import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, userType } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/profile" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-indigo-600">My Profile</h2>
          <p className="text-gray-600 mt-2">Update your personal information.</p>
        </Link>
        
        <Link to="/chat" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-indigo-600">My Conversations</h2>
          <p className="text-gray-600 mt-2">View your chat history.</p>
        </Link>
        
        {userType === 'user' && (
          <Link to="/my-requests" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-indigo-600">My Rental Requests</h2>
            <p className="text-gray-600 mt-2">Track the status of your rental requests.</p>
          </Link>
        )}
        
        {userType === 'owner' && (
          <>
            <Link to="/my-properties" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-indigo-600">My Properties</h2>
              <p className="text-gray-600 mt-2">View and manage your listings.</p>
            </Link>
            
            <Link to="/create-property" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-indigo-600">List New Property</h2>
              <p className="text-gray-600 mt-2">Add a new property for rent.</p>
            </Link>

            <Link to="/incoming-requests" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-indigo-600">Incoming Requests</h2>
              <p className="text-gray-600 mt-2">Approve or deny rental requests.</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;