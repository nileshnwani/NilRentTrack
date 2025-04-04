'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      toast.success('Registration successful! Redirecting...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    <div className="w-full max-w-sm space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="/images/logo.png"
          alt="Company Logo"
          className="h-16 w-16 object-contain"
        />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Create an Account
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

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7265df]"
          />
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Profile Image URL (Optional)
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7265df]"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-[#7265df] hover:bg-[#5c51c9] text-white py-2 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      {/* Social Signups */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition transform hover:scale-105">
          <FaGoogle className="text-red-500 text-lg" />
          Sign up with Google
        </button>

        <button className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded-lg hover:bg-[#165bd4] transition transform hover:scale-105">
          <FaFacebook className="text-white text-lg" />
          Sign up with Facebook
        </button>
      </div>
    </div>
  </div>
  );
}

