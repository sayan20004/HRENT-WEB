import React, { useState, useEffect, useRef } from 'react';
import { getMessagesForConversation, sendMessage } from '../../api/chatService';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

const ChatWindow = ({ conversation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data } = await getMessagesForConversation(conversation._id);
        setMessages(data.messages);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchMessages();
  }, [conversation._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { data } = await sendMessage(conversation._id, { text: newMessage });
      setMessages([...messages, data.message]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center"><LoadingSpinner /></div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">{conversation.rental.property.title}</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isSender = msg.sender._id === user._id;
          return (
            <div key={msg._id} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-xs ${isSender ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p>{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;