"use client";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const RentTable = ({ payments, userId }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [filteredPayments, setFilteredPayments] = useState(payments);

  useEffect(() => {
    if (!userId) {
      setFilteredPayments(payments);
      return;
    }

    let newFilteredPayments = payments;
    if (filter === "paidToMe") {
      newFilteredPayments = payments.filter((payment) => payment.owner_id === userId);
    } else if (filter === "paidByMe") {
      newFilteredPayments = payments.filter((payment) => payment.user_id === userId);
    }

    if (search.trim() !== "") {
      newFilteredPayments = newFilteredPayments.filter((payment) =>
        payment.property_name.toLowerCase().includes(search.toLowerCase()) ||
        payment.transaction_id.toLowerCase().includes(search.toLowerCase()) ||
        payment.payment_method.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredPayments(newFilteredPayments);
  }, [filter, payments, userId, search]);

  const columns = [
    { name: "🏠 Property Name", selector: (row) => row.property_name, sortable: true },
    { name: "💰 Payment Method", selector: (row) => row.payment_method, sortable: true },
    { name: "₹ Amount", selector: (row) => `₹${row.amount}`, sortable: true },
    { name: "📅 No. of Months", selector: (row) => row.no_of_months, sortable: true },
    {
      name: "✅ Payment Status",
      selector: (row) => row.payment_status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
            row.payment_status === "Completed" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {row.payment_status}
        </span>
      ),
    },
    { name: "🔗 Transaction ID", selector: (row) => row.transaction_id, sortable: true },
    { name: "📅 Payment Date", selector: (row) => new Date(row.payment_date).toLocaleDateString(), sortable: true },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
        backgroundColor: "#f3f4f6",
        padding: "14px",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
        "&:hover": {
          backgroundColor: "#f8fafc",
        },
      },
    },
    cells: {
      style: {
        padding: "14px",
      },
    },
  };

  return (
    <div className="p-3 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* 🔍 Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search payments..."
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap space-x-2 mt-3 md:mt-0">
          <button
            className={`px-5 py-2 rounded-full transition ${
              filter === "paidToMe" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setFilter("paidToMe")}
          >
            📩 Paid to Me
          </button>
          <button
            className={`px-5 py-2 rounded-full transition ${
              filter === "paidByMe" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
            }`}
            onClick={() => setFilter("paidByMe")}
          >
            💸 Paid by Me
          </button>
          <button
            className={`px-5 py-2 rounded-full transition ${
              filter === "all" ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white"
            }`}
            onClick={() => setFilter("all")}
          >
            🔄 Show All
          </button>
        </div>
      </div>

      {/* 📊 Rent Payments Table */}
      <DataTable
        columns={columns}
        data={filteredPayments}
        pagination
        striped
        highlightOnHover
        responsive
        fixedHeader
        fixedHeaderScrollHeight="500px"
        customStyles={customStyles}
      />
    </div>
  );
};

export default RentTable;
