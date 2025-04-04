import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import PropertyCard from '@/components/PropertyCard';
const SearchResultsPage = async ({ searchParams: { location, propertyType } }) => {
  const db = await connectDB();

  let query = "SELECT * FROM properties WHERE city LIKE ?";
  let values = [`%${location}%`]; // Use correct column name

  if (propertyType && propertyType !== 'All') {
    query += " AND type = ?";
    values.push(propertyType);
  }

  let properties = [];

  try {
    [properties] = await db.execute(query, values);
  } catch (error) {
    console.error("Database Query Error:", error);
    properties = []; // Handle errors gracefully
  }

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3'>
            <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
          </Link>
          <h1 className='text-2xl mb-4'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
