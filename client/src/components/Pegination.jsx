import React from "react";

const Pegination = ({ nPages, currentPage, setCurrentPage }) => {
  if (nPages <= 1) return null;

  const pageNumbers = [...Array(nPages).keys()].map(n => n + 1);

  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(p => p - 1)}
        className="border px-3 py-1 mx-1 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pageNumbers.map(num => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          className={`border px-3 py-1 mx-1 rounded ${
            currentPage === num ? "bg-blue-500 text-white" : ""
          }`}
        >
          {num}
        </button>
      ))}

      <button
        disabled={currentPage === nPages}
        onClick={() => setCurrentPage(p => p + 1)}
        className="border px-3 py-1 mx-1 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pegination;
