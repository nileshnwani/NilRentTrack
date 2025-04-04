'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropertyTable from '@/components/PropertyTable'; // Import the new component

const MyPropertyPage = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchProperties();
    }
  }, [isAuthenticated]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`/api/properties/myproperties?owner_id=${user.userId}`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {  
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
  
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
      toast.error('Unauthorized: Please log in again.');
      return;
    }
  
    try {
      setLoading(true);
  
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Check if response is empty before calling .json()
      if (response.status === 204) { // 204 No Content (successful deletion)
        toast.success('Property deleted successfully!');
        fetchProperties();
        return;
      }
  
      // Try parsing JSON if there's content
      const responseText = await response.text();
      const errorData = responseText ? JSON.parse(responseText) : null;
  
      if (!response.ok) {
        throw new Error(errorData?.error || 'Failed to delete property');
      }
  
      toast.success('Property deleted successfully!');
      fetchProperties(); // Refresh the list
  
    } catch (error) {
      console.error('Delete Error:', error);
      toast.error(error.message || 'Error deleting property');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredData = properties.filter(property =>
      property.name.toLowerCase().includes(value) ||
      property.type.toLowerCase().includes(value) ||
      property.city.toLowerCase().includes(value)
    );
    setFilteredProperties(filteredData);
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading properties...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">My Properties</h2>
      
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search properties..."
          className="border border-gray-300 p-2 rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
      </div>

      <PropertyTable properties={filteredProperties} handleDelete={handleDelete} />
    </div>
  );
};

export default MyPropertyPage;
