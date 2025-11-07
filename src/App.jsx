import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyDetails from './pages/PropertyDetails';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MyProperties from './pages/MyProperties';
import CreateProperty from './pages/CreateProperty';
import IncomingRequests from './pages/IncomingRequests';
import MyRequests from './pages/MyRequests';
import MyConversations from './pages/MyConversations';

import Header from './components/common/Header';
import ProtectedRoute from './components/common/ProtectedRoute';
import OwnerRoute from './components/common/OwnerRoute';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:id" element={<PropertyDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/chat" element={<MyConversations />} />
            <Route path="/chat/:conversationId" element={<MyConversations />} />
          </Route>

          <Route element={<OwnerRoute />}>
            <Route path="/my-properties" element={<MyProperties />} />
            <Route path="/create-property" element={<CreateProperty />} />
            <Route path="/incoming-requests" element={<IncomingRequests />} />
          </Route>

          <Route path="*" element={<div className="text-center text-3xl font-bold">404 - Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;