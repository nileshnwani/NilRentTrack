'use client';

import { useAuth } from '@/context/AuthContext'; // Import authentication context
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyAddForm = () => {
  const { user, token } = useAuth(); // Get user and token
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user || !user.userId) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);
    formData.append('owner_id', user.userId); // Ensure owner_id is included
    formData.append('renter_id', '0'); // Default to 0 (not rented yet)

    try {
      const response = await fetch('/api/properties/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error('Failed to add property');
        throw new Error(data.error || 'Failed to add property');
      }

      toast.success('Property added successfully! 🎉');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-3xl text-center font-semibold mb-6'>Add Property</h2>

      {/* Property Name */}
      <div className='mb-4'>
        <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>Property Name</label>
        <input type='text' id='name' name='name' className='border rounded w-full py-2 px-3' placeholder='Enter property name' required />
      </div>

      {/* Property Type */}
      <div className='mb-4'>
        <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>Property Type</label>
        <select id='type' name='type' className='border rounded w-full py-2 px-3' required>
          <option value='Apartment'>Apartment</option>
          <option value='Condo'>Condo</option>
          <option value='House'>House</option>
          <option value='Studio'>Studio</option>
          <option value='Other'>Other</option>
        </select>
      </div>

      {/* Description */}
      <div className='mb-4'>
        <label htmlFor='description' className='block text-gray-700 font-bold mb-2'>Description</label>
        <textarea id='description' name='description' className='border rounded w-full py-2 px-3' rows='4' placeholder='Property description' required></textarea>
      </div>

      {/* Location */}
      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Location</label>
        <input type='text' name='street' className='border rounded w-full py-2 px-3 mb-2' placeholder='Street' required />
        <input type='text' name='city' className='border rounded w-full py-2 px-3 mb-2' placeholder='City' required />
        <input type='text' name='state' className='border rounded w-full py-2 px-3 mb-2' placeholder='State' required />
        <input type='text' name='zipcode' className='border rounded w-full py-2 px-3 mb-2' placeholder='Zipcode' required />
        <input type='text' name='country' className='border rounded w-full py-2 px-3' placeholder='Country' required />
      </div>

      {/* Number of Units */}
      <div className='mb-4'>
        <label htmlFor='number_of_units' className='block text-gray-700 font-bold mb-2'>Number of Units</label>
        <input type='number' id='number_of_units' name='number_of_units' className='border rounded w-full py-2 px-3' defaultValue="1" required />
      </div>

      {/* Rates */}
      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Rental Rate (Amount in USD)</label>
        <input type='number' name='rates' className='border rounded w-full py-2 px-3' placeholder='Enter rental price' required />
      </div>

      {/* Due Date */}
      <div className='mb-4'>
        <label htmlFor='due_date' className='block text-gray-700 font-bold mb-2'>Due Date</label>
        <input type='date' id='due_date' name='due_date' className='border rounded w-full py-2 px-3' required />
      </div>

      {/* Seller Information */}
      <div className='mb-4'>
        <label htmlFor='seller_name' className='block text-gray-700 font-bold mb-2'>Seller Name</label>
        <input type='text' id='seller_name' name='seller_name' className='border rounded w-full py-2 px-3' required />
      </div>
      <div className='mb-4'>
        <label htmlFor='seller_email' className='block text-gray-700 font-bold mb-2'>Seller Email</label>
        <input type='email' id='seller_email' name='seller_email' className='border rounded w-full py-2 px-3' required />
      </div>
      <div className='mb-4'>
        <label htmlFor='seller_phone' className='block text-gray-700 font-bold mb-2'>Seller Phone</label>
        <input type='tel' id='seller_phone' name='seller_phone' className='border rounded w-full py-2 px-3' required />
      </div>

      {/* Property Image (Single Image) */}
      <div className='mb-4'>
        <label htmlFor='images' className='block text-gray-700 font-bold mb-2'>Property Image</label>
        <input type='file' id='images' name='images' className='border rounded w-full py-2 px-3' accept='image/*' required />
      </div>

      {/* Submit Button */}
      <button type="submit" className='bg-[#7265df]  text-white hover:text-[#7265df] hover:border-[#9c9ddc] hover:bg-[#f2f2f2] font-bold py-2 px-4 rounded-full w-full' disabled={loading}>
        {loading ? 'Adding Property...' : 'Add Property'}
      </button>
    </form>
  );
};

export default PropertyAddForm;
