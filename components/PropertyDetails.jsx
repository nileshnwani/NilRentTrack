import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarkerAlt,
  FaDollarSign,
  FaHome,
  FaRegCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaClock,
} from "react-icons/fa";
import PropertyMap from "@/components/PropertyMap";

const PropertyDetails = ({ property }) => {
  return (
    <main className="max-w-4xl mx-auto">
      {/* Property Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 uppercase tracking-wide mb-2">{property.type}</div>
        <h1 className="text-4xl font-extrabold mb-3 text-gray-800">{property.name}</h1>
        
        <div className="text-gray-600 mb-4 flex items-center justify-center md:justify-start">
          <FaMapMarkerAlt className="text-orange-600 mt-1 mr-2" />
          <p className="text-orange-700 font-medium">
            {property.street}, {property.city}, {property.state}, {property.zipcode}, {property.country}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-6">{property.description}</p>

       

        {/* Price & Rent Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm my-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Rates & Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center border-r border-gray-300">
              <FaDollarSign className="text-green-500 text-3xl mr-2" />
              <div>
                <p className="text-lg font-semibold">Monthly Rent</p>
                <span className="text-2xl font-bold text-blue-500">${property.rates}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <FaRegCalendarAlt className="text-gray-500 text-3xl mr-2" />
              <div>
                <p className="text-lg font-semibold">Available From</p>
                <span className="text-lg font-bold text-gray-700">{property.due_date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Table */}
        <h3 className="text-xl font-bold my-6 text-gray-800">Property Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 flex items-center">
                  <FaBed className="text-blue-500 mr-2" /> Bedrooms
                </td>
                <td className="p-4 text-gray-900 font-medium">{property.bedrooms}</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 flex items-center">
                  <FaBath className="text-blue-500 mr-2" /> Bathrooms
                </td>
                <td className="p-4 text-gray-900 font-medium">{property.bathrooms}</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 flex items-center">
                  <FaRulerCombined className="text-blue-500 mr-2" /> Area Size
                </td>
                <td className="p-4 text-gray-900 font-medium">{property.area} sq. ft.</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 flex items-center">
                  <FaBuilding className="text-blue-500 mr-2" /> Number of Units
                </td>
                <td className="p-4 text-gray-900 font-medium">{property.number_of_units}</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold text-gray-700 flex items-center">
                  <FaHome className="text-blue-500 mr-2" /> Property Type
                </td>
                <td className="p-4 text-gray-900 font-medium">{property.type}</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-700 flex items-center">
                  {property.furnished ? <FaCheck className="text-green-500 mr-2" /> : <FaTimes className="text-red-500 mr-2" />}
                  Furnished
                </td>
                <td className="p-4 text-gray-900 font-medium">{property.furnished ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Seller Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Seller Information</h3>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            <FaHome className="text-blue-500 text-2xl mr-2" />
            <p className="text-gray-900 font-medium">{property.seller_name}</p>
          </div>
          <div className="flex items-center mb-2 md:mb-0">
            <FaEnvelope className="text-red-500 text-2xl mr-2" />
            <p className="text-gray-900 font-medium">{property.seller_email}</p>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-green-500 text-2xl mr-2" />
            <p className="text-gray-900 font-medium">{property.seller_phone}</p>
          </div>
        </div>
      </div>

      {/* Property Map */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Location</h3>
        {/*<PropertyMap property={property} />*/}
        <iframe
    className="w-full h-96 rounded-lg"
    src="https://maps.google.com/maps?q=India&t=&z=5&ie=UTF8&iwloc=&output=embed"
    allowFullScreen
    loading="lazy"
  ></iframe>
      </div>
    </main>
  );
};

export default PropertyDetails;
