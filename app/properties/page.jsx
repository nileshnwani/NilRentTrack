'use client';

import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

const PropertiesPage = ({ searchParams }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageSize = 6; // Show 6 properties per page
  const page = parseInt(searchParams?.page) || 1;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties'); // Fetch from API
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Calculate paginated properties
  const total = properties.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedProperties = properties.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      {/* Search Banner */}
      <section className="bg-gradient-to-r to-[#7265df] from-[#3c3c63] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Find Your Next Home</h1>
          <p className="mb-4 text-sm sm:text-base">
            Use the filters below to search for properties that match your needs.
          </p>
          <PropertySearchForm />
        </div>
      </section>

      {/* Property Grid */}
      <section className="px-4 py-10 bg-[#f7f2f9]">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-2xl font-bold mb-6 text-[#3c3c63]">Browse Properties</h2>

          {loading ? (
            <Spinner />
          ) : paginatedProperties.length === 0 ? (
            <p className="text-center text-gray-500">No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProperties.map((property) => (
                <PropertyCard property={property} key={property.id} />
              ))}
            </div>
          )}

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              {page > 1 && (
                <Link
                  href={`/properties?page=${page - 1}`}
                  className="px-4 py-2 mx-2 border bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]

"
                >
                  Previous
                </Link>
              )}

              <span className="px-4 py-2 mx-2 bg-gray-200 rounded ">
                Page {page} of {totalPages}
              </span>

              {page < totalPages && (
                <Link
                  href={`/properties?page=${page + 1}`}
                  className="px-4 py-2 mx-2 border border-gray-300 bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]

"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
