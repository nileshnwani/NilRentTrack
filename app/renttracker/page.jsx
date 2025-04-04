'use client';

import { useEffect, useState } from 'react';
import RentTable from '@/components/paymentform/RentTable';
import { useAuth } from "@/context/AuthContext";

const RentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) return; // ✅ Ensure `userId` is available before fetching

    const fetchPayments = async () => {
      try {
        const response = await fetch('/api/payments'); // Fetch from API
        if (!response.ok) throw new Error('Failed to fetch payments');
        const data = await response.json();

        if (!data || !Array.isArray(data)) {
          console.warn("Received invalid payment data:", data);
          setPayments([]);
          return;
        }

        // ✅ Filter payments where the user is either the payer (`user_id`) or owner (`owner_id`)
        const filteredPayments = data.filter(payment => 
          payment.user_id === userId || payment.owner_id === userId
        );

        setPayments(filteredPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setPayments([]); // ✅ Prevent breaking UI if an error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId]); // ✅ Fetch only when `userId` changes

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading payments...</p>;
  }

  return (
<div className="container mx-auto p-6">
  <h2 className="text-3xl font-extrabold text-center mb-6 text-white bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 py-4 px-8 rounded-lg shadow-lg w-full">
    💳 My Payments
  </h2>

  <RentTable payments={payments} userId={userId} /> {/* ✅ Pass filtered payments */}
</div>

  );
};

export default RentPage;
