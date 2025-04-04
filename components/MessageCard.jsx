"use client";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageCard = ({ message, onDelete }) => {
  if (!message) return null; // Handle undefined or null messages

  const [isRead, setIsRead] = useState(message.seen);
  const [isDeleted, setIsDeleted] = useState(false);
  const handleReadClick = async () => {
    if (!message.id) return;
  
    const newSeenStatus = isRead ? 0 : 1; // Toggle seen status
  
    try {
      const response = await fetch(`/api/messages`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: message.id, seen: newSeenStatus }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setIsRead(newSeenStatus === 1);
        toast.success(`Marked as ${newSeenStatus ? "read" : "new"}`);
      } else {
        toast.error(result.error || "Failed to update message status");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("An error occurred while updating the message status.");
    }
  };
  

  const handleDeleteClick = async () => {
    if (!message.id) return;

    try {
      const response = await fetch(`/api/messages?id=${message.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        setIsDeleted(true);
        toast.success("Message Deleted");
        if (onDelete) onDelete(message.id); // Remove from UI list
      } else {
        toast.error(result.error || "Failed to delete message");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("An error occurred while deleting the message.");
    }
  };

  if (isDeleted) {
    return <p className="text-gray-500 italic">Message deleted</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span> {message.propertyName || "Unknown Property"}
      </h2>
      <p className="text-gray-700">{message.body || "No message body available."}</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email || "N/A"}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone || "N/A"}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {message.createdAt ? new Date(message.createdAt).toLocaleString() : "Unknown date"}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${isRead ? "bg-gray-300" : "bg-blue-500 text-white"} py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
