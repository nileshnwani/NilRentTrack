"use client";

import MessageCard from "@/components/MessageCard";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
const MessagePage = () => {
  const { user } = useAuth();
  const userId = user?.userId; // Get userId from AuthContext
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages/read?userId=${userId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch messages");

        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, [userId]);

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <Spinner/>
            ) : (
              messages.map((message) => (
                <MessageCard key={message.id} message={message} onDelete={handleDeleteMessage} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
