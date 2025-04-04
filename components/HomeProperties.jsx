import Link from 'next/link';
import PropertyCard from './PropertyCard';
import connectDB from '@/config/database';

const HomeProperties = async () => {
  const db = await connectDB(); // Ensure MySQL connection is established

  let recentProperties = [];
  try {
    const [rows] = await db.execute(
      'SELECT * FROM properties ORDER BY created_at DESC LIMIT 3'
    );
    recentProperties = rows;
  } catch (error) {
    console.error('Error fetching properties:', error);
  }

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-[#7265df] mb-6 text-center'>
            RECENTLY ADDED PROPERTIES
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-[#7265df] text-white text-center py-4 px-6 rounded-xl hover:bg-[#f2f2f2] hover:text-[#7265df]'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
