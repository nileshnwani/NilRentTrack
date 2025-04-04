"use client";
import { useEffect, useState } from "react";

const RentDueList = ({ userId }) => {
  const [rentDueProperties, setRentDueProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ Error state

  useEffect(() => {
    if (!userId) return; // Exit if no userId (not logged in)

    const fetchRentDueProperties = async () => {
      try {
        console.log("Fetching rent due properties for user:", userId);

        const response = await fetch("/api/rent-due", {
          method: "GET",
          headers: { "user-id": userId },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error response:", errorData);
          throw new Error("Failed to fetch rent due properties");
        }

        const data = await response.json();
        console.log("Fetched rent due properties:", data);
        setRentDueProperties(data);
      } catch (error) {
        console.error("Error fetching rent due properties:", error);
        setError("Failed to load rent due properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentDueProperties();
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      {/* 🏡 Section Title */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold text-center">🏡 Upcoming Rent Due</h2>
      </div>

      {/* 🕐 Loading State */}
      {loading && (
        <div className="flex justify-center mt-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500"></div>
        </div>
      )}

      {/* ❌ Error Handling */}
      {error && !loading && (
        <div className="text-center text-red-500 font-semibold text-lg mt-4">
          {error}
        </div>
      )}

      {/* 📜 No Rent Due */}
      {!loading && rentDueProperties.length === 0 && !error && (
        <div className="text-center text-gray-600 text-lg font-medium mt-6">
          No rent due in the next 7 days. 🎉
        </div>
      )}

      {/* ✅ Rent Due Table */}
      {!loading && rentDueProperties.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Property</th>
                <th className="px-4 py-3 text-left">Street</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">State</th>
                <th className="px-4 py-3 text-left">Zipcode</th>
                <th className="px-4 py-3 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {rentDueProperties.map((property) => (
                <tr
                  key={property.id}
                  className="border-t hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-3">{property.name}</td>
                  <td className="px-4 py-3">{property.street}</td>
                  <td className="px-4 py-3">{property.city}</td>
                  <td className="px-4 py-3">{property.state}</td>
                  <td className="px-4 py-3">{property.zipcode}</td>
                  <td className="px-4 py-3 text-red-600 font-bold">
                    {new Date(property.due_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RentDueList;
