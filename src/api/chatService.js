import api from './api';

export const getMyConversations = () => {
  return api.get('/chat');
};

export const getOrCreateConversation = (rentalId) => {
  return api.post('/chat/initiate', { rentalId });
};

export const getMessagesForConversation = (conversationId) => {
  return api.get(`/chat/${conversationId}/messages`);
};

export const sendMessage = (conversationId, messageData) => {
  return api.post(`/chat/${conversationId}/messages`, messageData);
};