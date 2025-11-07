import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('h-rent-token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const { data } = await api.get('/user/profile');
          setUser(data.user);
          localStorage.setItem('h-rent-token', token);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('h-rent-token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('h-rent-token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, userType: user?.userType }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;