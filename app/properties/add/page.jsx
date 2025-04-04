'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PropertyAddForm from '@/components/PropertyAddForm';

const PropertyAddPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Checking authentication...</p>;
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-4xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm property={null} />
        </div>
      </div>
    </section>
  );
};

export default PropertyAddPage;
