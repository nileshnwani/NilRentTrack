'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      if (typeof login === 'function') {
        login(data.token);
        toast.success('Login successful');
        router.push('/dashboard'); // Redirect to dashboard after successful login
      } else {
        console.error('Login function is undefined!');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong! Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    <div className="w-full max-w-sm space-y-6">
      {/* Company Logo */}
      <div className="flex justify-center">
        <img
          src="/images/logo.png"
          alt="Company Logo"
          className="h-16 w-16 object-contain"
        />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Welcome Back
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7265df] hover:bg-[#5c51c9] text-white py-2 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      {/* Social Logins */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition transform hover:scale-105">
          <FaGoogle className="text-red-500 text-lg" />
          Continue with Google
        </button>

        <button className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded-lg hover:bg-[#165bd4] transition transform hover:scale-105">
          <FaFacebook className="text-white text-lg" />
          Continue with Facebook
        </button>
      </div>
    </div>
  </div>
  );
};

export default Login;

