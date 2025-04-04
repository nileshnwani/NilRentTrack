"use client";

import { useRouter } from "next/navigation";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const PayButton = ({ property }) => {
  const router = useRouter();

  const { isAuthenticated } = useAuth(); // Check if the user is authenticated

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error("You need to sign in to proceed with the payment");
      router.push("/login"); // Redirect to login page
      return;
    }

    // Redirect to the payment page
    router.push(`/payment?propertyId=${property?.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]
 font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Take On Rent
    </button>
  );
};

export default PayButton;
