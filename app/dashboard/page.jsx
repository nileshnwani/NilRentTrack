"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import RentPage from "../renttracker/page";
import RentDueList from "../renttracker/RentDueList";
const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const userId = user?.userId; // Get userId from AuthContext

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }

    console.log("User:", user); // Debugging: Check if full user data is available
  }, [isAuthenticated, user]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 px-8 rounded-lg shadow-lg mb-6 ml-15 mr-5 ">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-extrabold text-center md:text-left">
            🚀 Dashboard
          </h1>
          <p className="text-lg mt-2 md:mt-0 bg-white text-gray-800 py-2 px-4 rounded-full shadow-md font-semibold">
            Welcome, {user?.email || "Guest"}
          </p>
        </div>
      </div>

      {/*<p className="text-gray-600">User ID: {user?.userId}</p>
      <p className="text-gray-600">Admin: {user?.isAdmin ? 'Yes' : 'No'}</p>*/}
      <RentPage></RentPage>
      <div>
        {user && <RentDueList userId={user.userId} />}{" "}
        {/* Pass userId as prop */}
      </div>
    </div>
  );
};

export default Dashboard;
