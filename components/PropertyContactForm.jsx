'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import SubmitMessageButton from './SubmitMessageButton';
import { useAuth } from '@/context/AuthContext';

const PropertyContactForm = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [propertyId, setPropertyId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract propertyId from the URL path
    const pathSegments = pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    setPropertyId(id);

    // Fetch property details to get recipientId (owner_id)
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property details');
        }
        const property = await response.json();
        setRecipientId(property.owner_id);
      } catch (error) {
        console.error('Error fetching property details:', error);
        toast.error('Error fetching property details');
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [pathname]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to send a message.');
      return;
    }

    const formData = new FormData(e.target);
    const messageData = {
      sender_id: user.userId,
      recipient_id: recipientId,
      property_id: propertyId,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || null,
      body: formData.get('message'),
    };

    try {
      setLoading(true);
      const response = await fetch('/api/messages/send/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success('Message sent successfully!');
      e.target.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error.message || 'Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      <form onSubmit={handleFormSubmit}>
        <input type='hidden' name='property' value={propertyId} />
        <input type='hidden' name='recipient' value={recipientId} />

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Name:
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email:
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
            Phone:
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
            id='phone'
            name='phone'
            type='text'
            placeholder='Enter your phone number'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>
            Message:
          </label>
          <textarea
            className='shadow border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
            id='message'
            name='message'
            placeholder='Enter your message'
            required
          ></textarea>
        </div>
        <div>
          <SubmitMessageButton isLoading={loading} />
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
