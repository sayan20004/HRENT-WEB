import api from './api';

export const getAllProperties = () => {
  return api.get('/properties');
};

export const getPropertyById = (id) => {
  return api.get(`/properties/${id}`);
};

export const getMyProperties = () => {
  return api.get('/properties/my-properties');
};

export const createProperty = (propertyData) => {
  return api.post('/properties', propertyData);
};