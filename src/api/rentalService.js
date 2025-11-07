import api from './api';

export const createRentalRequest = (propertyId) => {
  return api.post('/rentals', { propertyId });
};

export const getMyRentalRequests = () => {
  return api.get('/rentals/my-requests');
};

export const getIncomingRentalRequests = () => {
  return api.get('/rentals/incoming-requests');
};

export const updateRentalStatus = (id, status) => {
  return api.put(`/rentals/${id}/status`, { status });
};