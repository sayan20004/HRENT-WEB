import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMyConversations, getOrCreateConversation } from '../api/chatService';
import ChatWindow from '../components/chat/ChatWindow';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MyConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { conversationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await getMyConversations();
        setConversations(data.conversations);
        if (conversationId) {
          const found = data.conversations.find(c => c._id === conversationId);
          setActiveConversation(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [conversationId]);

  const selectConversation = (convo) => {
    setActiveConversation(convo);
    navigate(`/chat/${convo._id}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  }

  return (
    <div className="flex h-[calc(100vh-120px)] border bg-white rounded-lg shadow-xl">
      <div className="w-1/3 border-r overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b">Chats</h2>
        {conversations.length === 0 ? (
          <p className="p-4 text-gray-500">No conversations started.</p>
        ) : (
          conversations.map(convo => (
            <div
              key={convo._id}
              onClick={() => selectConversation(convo)}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${activeConversation?._id === convo._id ? 'bg-indigo-50' : ''}`}
            >
              <p className="font-semibold">{convo.rental.property.title}</p>
              <p className="text-sm text-gray-600">
                Chat with {convo.participants.find(p => p._id !== convo.rental.property.owner).firstName}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="w-2/3">
        {activeConversation ? (
          <ChatWindow conversation={activeConversation} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyConversations;