"use client"
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyEditForm = () => {
  const { user, token } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch property details on page load
  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch property details');

        const data = await response.json();
        if (data.due_date) {
          data.due_date = data.due_date.slice(0, 10);
        }
        setFormData(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProperty();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user?.userId) {
      toast.error('User is not authenticated');
      setLoading(false);
      return;
    }

    try {
      const updatedData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'images' && formData.images) {
          Array.from(formData.images).forEach((file) => {
            updatedData.append('images', file);
          });
        } else if (formData[key]) {
          updatedData.append(key, formData[key]);
        }
      });

      const response = await fetch(`/api/properties/edit/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedData,
      });

      if (!response.ok) throw new Error('Failed to update property');

      toast.success('Property updated successfully! 🎉');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-3xl text-center font-semibold mb-6'>Edit Property</h2>

      {/* Property Name */}
      <div className='mb-4'>
        <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>Property Name</label>
        <input type='text' id='name' name='name' className='border rounded w-full py-2 px-3' value={formData.name || ''} onChange={handleChange} required />
      </div>

      {/* Property Type */}
      <div className='mb-4'>
        <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>Property Type</label>
        <select id='type' name='type' className='border rounded w-full py-2 px-3'  value={formData.type || ''} onChange={handleChange} required>
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
        <textarea id='description' name='description' className='border rounded w-full py-2 px-3' rows='4' placeholder='Property description'  value={formData.description || ''}onChange={handleChange} required></textarea>
      </div>

      {/* Location */}
      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Location</label>
        <input type='text' name='street' className='border rounded w-full py-2 px-3 mb-2' placeholder='Street' value={formData.street || ''} onChange={handleChange}  required />
        <input type='text' name='city' className='border rounded w-full py-2 px-3 mb-2' placeholder='City'value={formData.city || ''} onChange={handleChange}  required />
        <input type='text' name='state' className='border rounded w-full py-2 px-3 mb-2' placeholder='State' value={formData.state || ''} onChange={handleChange} required />
        <input type='text' name='zipcode' className='border rounded w-full py-2 px-3 mb-2' placeholder='Zipcode' value={formData.zipcode || ''} onChange={handleChange}  required />
        <input type='text' name='country' className='border rounded w-full py-2 px-3' placeholder='Country' value={formData.country || ''} onChange={handleChange}  required />
      </div>


      {/* Due Date */}
      <div className='mb-4'>
        <label htmlFor='due_date' className='block text-gray-700 font-bold mb-2'>Due Date</label>
        <input type='date' id='due_date' name='due_date' className='border rounded w-full py-2 px-3' value={formData.due_date || ''} onChange={handleChange} required />
      </div>

      {/* Number of Units */}
      <div className='mb-4'>
        <label htmlFor='number_of_units' className='block text-gray-700 font-bold mb-2'>Number of Units</label>
        <input type='number' id='number_of_units' name='number_of_units' className='border rounded w-full py-2 px-3'  value={formData.number_of_units || ''} onChange={handleChange}  required />
      </div>

      {/* Rates */}
      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Rental Rate (Amount in USD)</label>
        <input type='number' name='rates' className='border rounded w-full py-2 px-3' placeholder='Enter rental price'  value={formData.rates || ''} onChange={handleChange}  required />
      </div>

      {/* Seller Information */}
      <div className='mb-4'>
        <label htmlFor='seller_name' className='block text-gray-700 font-bold mb-2'>Seller Name</label>
        <input type='text' id='seller_name' name='seller_name' className='border rounded w-full py-2 px-3' value={formData.seller_name || ''}
          onChange={handleChange} required />
      </div>
      <div className='mb-4'>
        <label htmlFor='seller_email' className='block text-gray-700 font-bold mb-2'>Seller Email</label>
        <input type='email' id='seller_email' name='seller_email' className='border rounded w-full py-2 px-3'  value={formData.seller_email || ''}
          onChange={handleChange} required />
      </div>
      <div className='mb-4'>
        <label htmlFor='seller_phone' className='block text-gray-700 font-bold mb-2'>Seller Phone</label>
        <input type='tel' id='seller_phone' name='seller_phone' className='border rounded w-full py-2 px-3' value={formData.seller_phone || ''}
          onChange={handleChange} required />
      </div>

      {/* Property Image (Single Image) */}
      <div className='mb-4'>
        <label htmlFor='images' className='block text-gray-700 font-bold mb-2'>Property Image</label>
        <input type='file' id='images' name='images' className='border rounded w-full py-2 px-3' accept='image/*' onChange={handleChange}   />
      </div>

      {/* Submit Button */}
      <button type="submit" className='bg-[#7265df]  text-white hover:text-[#7265df] hover:border-[#9c9ddc] hover:bg-[#f2f2f2]  font-bold py-2 px-4 rounded-full w-full' disabled={loading}>
        {loading ? 'Updating Property...' : 'Update Property'}
      </button>
    </form>
  );
};

export default PropertyEditForm;

