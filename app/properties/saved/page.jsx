'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PropertyCard from '@/components/PropertyCard';

const SavedPropertiesPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user?.userId) return;

    const fetchSavedProperties = async () => {
      try {
        const res = await fetch(`/action/bookmarkProperty?userId=${user.userId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch saved properties');
        }

        setSavedProperties(data);
      } catch (error) {
        console.error('Error fetching saved properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <p>Please log in to view saved properties.</p>;
  }

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {loading ? (
          <p>Loading...</p>
        ) : savedProperties.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
