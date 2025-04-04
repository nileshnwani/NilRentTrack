"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import PayButton from "@/components/PayButton";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);
        if (!response.ok) {
          throw new Error("Property not found");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <h1 className="text-center text-2xl font-bold mt-10">Loading...</h1>;
  }

  if (error) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        {error}
      </h1>
    );
  }

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }


  // Handle single image only
  const imagePath = property.images ?  `${property.images}`: "/fallback.jpg"; // Provide a default fallback image

  return (
    <>
      <PropertyHeaderImage image={imagePath} />
      <section>
  <div className="container m-auto py-6 px-4 sm:px-6">
    <Link
      href="/properties"
      className="text-[#7265df] font-bold flex items-center hover:underline"
    >
      <FaArrowLeft className="mr-2" /> Back to Properties
    </Link>
  </div>
</section>

<section className="bg-blue-50">
  <div className="container m-auto py-10 px-4 sm:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] w-full gap-8">
      {/* Main Property Details */}
      <div className="p-0">
        <PropertyDetails property={property} />
      </div>

      {/* Sidebar */}
      <aside className="w-full space-y-6 p-0 ml-0">
        <BookmarkButton property={property} />
        <PayButton property={property} />
        <ShareButtons property={property} />
        <PropertyContactForm property={property} />
      </aside>
    </div>
  </div>
</section>

    </>
  );
};

export default PropertyPage;
