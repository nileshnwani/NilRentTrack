"use client";
import { FaBookmark } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PropertyCard = ({ property }) => {
  const router = useRouter();
  const handleViewDetails = () => router.push(`/properties/${property.id}`);

  return (
    <div className="mt-0 rounded-xl shadow-md bg-white dark:bg-gray-900 transition-transform duration-300 hover:scale-[1.02]">
      {/* Image Section */}
      <div className="relative w-full h-[200px]">
        <Image
          src={property.images || "/default_image.png"}
          alt={property.name || "Property Image"}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
          priority
        />
        {/* Rates Badge */}
        <span className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md">
          {property.rates}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">
          {property.type}
        </p>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {property.name}
        </h2>

        {/* Location & Button */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm">
            <FaBookmark />
            <span>{`${property.city}, ${property.state}`}</span>
          </div>
          <button
            onClick={handleViewDetails}
            className="bg-[#7265df] text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
