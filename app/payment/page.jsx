"use client"; // Ensure this is a Client Component

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MultiStepForm from "@/components/paymentform/MultiStepForm";

const PaymentPage = () => {
  const searchParams = useSearchParams();


  const propertyId = searchParams.get("propertyId"); // Get propertyId from URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Store error messages

  console.log("Property ID:", propertyId);

  useEffect(() => {
    if (!propertyId) {
      console.error("Missing propertyId. API request aborted.");
      setError("Property ID is missing.");
      setLoading(false);
      return;
    }

    const fetchPropertyDetails = async () => {
      try {
        const res = await fetch(`/api/payments/fetch?propertyId=${propertyId}`);
        const data = await res.json();
        console.log("API Response:", data); // Debugging response

        if (res.ok && data.property) {
          setProperty(data.property);
        } else {
          setError(data.error || "Failed to fetch property details.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Network error or server issue.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!property) return <p>No property details found.</p>;

  return <div className="bg-[#f7f2f9]"><MultiStepForm property={property} />;
  </div>
};

export default PaymentPage;
