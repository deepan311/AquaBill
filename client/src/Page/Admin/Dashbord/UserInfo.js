import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const data = [
  { uid: 1, name: "John Doe" },
  { uid: 2, name: "Jane Smith" },
  { uid: 3, name: "Bob Johnson" },
  { uid: 4, name: "Sara Wilson" },
  { uid: 5, name: "Mike Davis" },
  { uid: 6, name: "Emily Brown" },
  { uid: 7, name: "Tom Wilson" },
  { uid: 8, name: "Jessica Lee" },
];

const UserInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page to 1 when search term changes
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="py-2 px-3 rounded-lg shadow-md w-full md:w-1/3 outline-none"
        />
      </div>
      <div className="overflow-x-auto text-white rounded-md">
        <table className="table-auto border-collapse w-full ">
          <thead className="bg-black/80">
            <tr className=" border-gray-500">
              <th className="px-4 py-5 ">UID</th>
              <th className="px-4 py-5">Name</th>
              <th className="px-4 py-5">info</th>
            </tr>
          </thead>
          <tbody className="bg-gradient-to-tr from-black to-gray-900">
            {currentItems.map((item) => (
              <tr key={item.uid} className=" hover:bg-white/10 text-center">
                <td className="px-4 py-5">{item.uid}</td>
                <td className="px-4 py-5">{item.name}</td>
                <td className="px-4 py-5 text-right">
                  <AiOutlineInfoCircle className="text-gray-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-6">
        <div>
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              className={`px-4 py-2 mx-1 rounded-md ${
                pageNum === currentPage
                  ? "bg-black/80 text-white"
                  : "bg-white text-blue-600"
              }`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} results
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
