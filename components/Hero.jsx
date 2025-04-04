import PropertySearchForm from './PropertySearchForm';

const Hero = () => {
  return (
    <section  className='bg-gradient-to-r to-[#7265df] from-[#3c3c63] py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
      <div className="text-center max-w-3xl mx-auto">
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
    Your Dream <span className="text-[#3c3c63]">Home </span>Awaits
  </h1>
  <p className="mt-4 text-lg sm:text-xl text-gray-200">
    Explore a wide range of rental properties tailored to your lifestyle and budget.
  </p>
</div>

        <PropertySearchForm />
      </div>
    </section>
  );
};
export default Hero;
