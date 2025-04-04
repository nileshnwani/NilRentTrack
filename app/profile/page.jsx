'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({ email: '', username: '', image: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch current user data from sessionStorage or API
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setFormData({ email: user.email, username: user.username, image: user.image });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(data.error || 'Profile update failed');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error updating profile');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex max-h-96 items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 ">
    <div className="w-full max-w-sm space-y-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mt-10 ">
        Edit Profile
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7265df]"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7265df]"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7265df]"
            placeholder="Optional"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full  bg-[#7265df] hover:bg-[#5c51c9] text-white py-2 rounded-lg font-semibold transition duration-200 transform hover:scale-105 "
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form >
      <div className="mb-20"></div>
    </div>
  </div>
  );
};

export default ProfileEdit;


