import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='For Renters'
            backgroundColor='bg-gray-100'
            buttonInfo={{
              text: 'Browse Properties',
              link: '/properties',
              backgroundColor: 'bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]',
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading='For Property Owners'
            backgroundColor='bg-blue-100'
            buttonInfo={{
              text: 'Add Property',
              link: '/properties/add',
              backgroundColor: 'bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]',
            }}
          >
            List your properties and reach potential tenants. Rent as an Airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxes;
