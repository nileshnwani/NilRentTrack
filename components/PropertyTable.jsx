'use client';

import DataTable from 'react-data-table-component';

const PropertyTable = ({ properties, handleDelete }) => {
  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Type', selector: row => row.type, sortable: true },
    { name: 'City', selector: row => row.city, sortable: true },
    { name: 'State', selector: row => row.state, sortable: true },
    { name: 'Units', selector: row => row.number_of_units, sortable: true },
    { name: 'Rates', selector: row => row.rates, sortable: true },
    { name: 'Seller Name', selector: row => row.seller_name, sortable: true },
    { name: 'Due Date', selector: row => row.due_date, sortable: true },
    { name: 'Seller Email', selector: row => row.seller_email, sortable: true },
    { name: 'Updated At', selector: row => row.updated_at, sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all"
            onClick={() => window.location.href = `/properties/edit/${row.id}`}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
        backgroundColor: '#f8f9fa',
        padding: '12px',
      },
    },
    rows: {
      style: {
        minHeight: '48px',
        '&:hover': {
          backgroundColor: '#f1f1f1',
        },
      },
    },
    cells: {
      style: {
        padding: '12px',
      },
    },
  };

  return (
    <DataTable
      columns={columns}
      data={properties}
      pagination
      striped
      highlightOnHover
      responsive
      fixedHeader
      fixedHeaderScrollHeight="500px"
      customStyles={customStyles}
    />
  );
};

export default PropertyTable;
