import api from './api';

export const sendRegistrationOtp = (userData) => {
  return api.post('/auth/register-send-otp', userData);
};

export const verifyRegistrationOtp = (data) => {
  return api.post('/auth/register-verify-otp', data);
};

export const sendLoginOtp = (email) => {
  return api.post('/auth/login-send-otp', { email });
};

export const verifyLoginOtp = (email, otp) => {
  return api.post('/auth/login-verify-otp', { email, otp });
};

export const googleAuth = (googleData) => {
  return api.post('/auth/google-auth', googleData);
};