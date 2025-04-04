"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // Import useRouter
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MultiStepForm = ({ property }) => {
  const [step, setStep] = useState(1);

  const router = useRouter(); // Initialize router

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0]; // Extract only the date part
  };
  const { user } = useAuth();
  const userId = user?.userId;

  const [formData, setFormData] = useState({
    property_id: property?.id || "", // Store propertyId
    user_id: userId || "", // Store userId
    owner_id: property?.owner_id || "", // Store owner_id
    due_date: property?.due_date ? formatDate(property.due_date) : "", // Fix the date format
    no_of_months: 1,
    amount: property?.rates || 0,
    payment_method: "",
    payment_status: "Pending",
    transaction_id: "",
  });

  // Extract monthly rent & due amount from property
  const monthlyRent = property?.rates || 0;
  const dueAmount = 0; // Change this if you have a due amount

  // Auto-calculate total amount when months change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amount: prev.no_of_months * monthlyRent + dueAmount,
    }));
  }, [formData.no_of_months, monthlyRent]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Navigation
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaction_id = `TXN${Math.floor(Math.random() * 1000000000)}`;

    try {
      const response = await fetch("/api/payments/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, transaction_id }),
      });

      const data = await response.json(); // This line is failing

      if (!response.ok) {
        throw new Error(data.error || "Payment submission failed");
      }

      console.log("Payment Successful:", data);
      toast.success("🎉 Payment Successful!", { position: "top-right" });
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to Dashboard
      }, 2000);
    } catch (error) {
      console.error("Payment submission error:", error);
      toast.error(`❌ Error: ${error.message}`, { position: "top-right" });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 mb-10 bg-[#f7f2f9] p-6  ">
      <h2 className="text-2xl font-bold text-center text-gray-700">
        Payment Form
      </h2>
      <div className="flex justify-between mb-4 text-sm text-gray-600">
        <span>Step {step} of 3</span>
      </div>

      {/* Step 1: Payment Calculation */}
      {step === 1 && (
        <div>
          <label className="block mt-4">Due Date</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            disabled
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4">Number of Months</label>
          <input
            type="number"
            name="no_of_months"
            value={formData.no_of_months}
            min="1"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange} // Now editable
            className="w-full p-2 border rounded"
          />
          <p className="mt-2 text-lg font-semibold text-gray-800">
            <strong>Total Amount:</strong> ₹{formData.amount}
          </p>

          <button
            onClick={nextStep}
            className="mt-4 w-40 h-11 rounded bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Payment Method */}
      {step === 2 && (
        <div>
          <label className="block mt-4">Select Payment Method</label>
          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Choose...</option>
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
          </select>

          <label className="block mt-4">Payment Status</label>
          <select
            name="payment_status"
            value={formData.payment_status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>

          <button
            onClick={prevStep}
            className="mt-4 bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc] w-40 h-11  p-2 rounded"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="mt-4 bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc] p-2  w-40 h-11 rounded ml-2"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 3: Confirmation & Submit */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Property Details</h2>
          <p>
            <strong>Name:</strong> {property?.name}
          </p>
          <p>
            <strong>Type:</strong> {property?.type}
          </p>
          <p>
            <strong>Address:</strong> {property?.street}, {property?.city},{" "}
            {property?.state}, {property?.zipcode}
          </p>
          <p>
            <strong>Rates:</strong> ₹{property?.rates}
          </p>
          <p>
            <strong>Seller:</strong> {property?.seller_name} (
            {property?.seller_email})
          </p>
          <p>
            <strong>Due Date:</strong> {property?.due_date}
          </p>

          <h2 className="text-xl font-bold mt-6 mb-4">Payment Details</h2>
          <p>
            <strong>Payment Status:</strong> {formData.payment_status}
          </p>
          <p>
            <strong>Payment Method:</strong> {formData.payment_method}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{formData.amount}
          </p>
          <p>
            <strong>Transaction ID:</strong>{" "}
            {formData.transaction_id || "To be generated"}
          </p>

          <button
            onClick={prevStep}
            className="mt-4 w-40 h-11 bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc] p-2 rounded"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="mt-4  p-2 w-40 h-11 rounded ml-2 bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]"
          >
            Confirm and Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
