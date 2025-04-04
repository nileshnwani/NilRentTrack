'use client';
import { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const BookmarkButton = ({ property }) => {
  const { isAuthenticated,user } = useAuth(); // Check if the user is authenticated

  const userId = property.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock function to check if the property is bookmarked
  const checkBookmarkStatus = async (propertyId) => {
    setLoading(true);
    // Simulating a delay for checking bookmark status
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Sample mock response: return bookmarked status randomly
    return { isBookmarked: Math.random() > 0.5 };
  };
  // Mock function to bookmark or remove a bookmark from the property
  const bookmarkProperty = async (propertyId) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const success = Math.random() > 0.5;
    if (success) {
      return { isBookmarked: !isBookmarked, message: 'Successfully updated bookmark' };
    } else {
      return { error: 'Failed to update bookmark' };
    }
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property');
      return;
    }

    const res = await bookmarkProperty(property._id);
    if (res.error) return toast.error(res.error);
    setIsBookmarked(res.isBookmarked);
    toast.success(res.message);
  };

  if (loading) return <p className='text-center'>Loading...</p>;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      <FaBookmark className='mr-2' /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      <FaBookmark className='mr-2' /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
