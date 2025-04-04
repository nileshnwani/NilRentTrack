import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const searchParams = useSearchParams();
  
  // Preserve existing query parameters
  const createPageLink = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    return `/properties?${params.toString()}`;
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8 space-x-4">
      {/* Previous Button */}
      <Link
        href={page > 1 ? createPageLink(page - 1) : "#"}
        className={`px-4 py-2 border border-gray-300 rounded-lg text-gray-700 ${
          page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
        aria-disabled={page === 1}
      >
        Previous
      </Link>

      {/* Page Info */}
      <span className="text-gray-700 text-sm font-medium">
        Page {page} of {totalPages}
      </span>

      {/* Next Button */}
      <Link
        href={page < totalPages ? createPageLink(page + 1) : "#"}
        className={`px-4 py-2 border border-gray-300 rounded-lg text-gray-700 ${
          page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
        aria-disabled={page === totalPages}
      >
        Next
      </Link>
    </section>
  );
};

export default Pagination;
