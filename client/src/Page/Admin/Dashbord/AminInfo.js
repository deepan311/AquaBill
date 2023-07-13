import React, { useState, useEffect, useContext } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PopUpInfo from "./PopUp/PopUpInfo";
import { AuthContext } from "../../../AuthProvider";

import { BiLoaderAlt } from "react-icons/bi";


const data = [
  { uid: 1, name: "John Doe" },
  { uid: 2, name: "Jane Smith" },
  { uid: 3, name: "Bob Johnson" },
];

const AdminInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { allData, fetchAllData } = useContext(AuthContext);

  const [PopUpData, setPopUpData] = useState({ status: false, data: null });

  useEffect(() => {
    if (allData.length === 0) {
      const fetch = async () => {
        await fetchAllData();
      };
      fetch();
    }
  }, []);

  if (allData.length === 0) {
    return (
      <div className="flex justify-center w-full  h-full items-center">
        <BiLoaderAlt className="text-2xl animate-spin text-black-500" />
        Loading...
      </div>
    );
  }

  const adminData = allData.filter(item =>item.roll==='admin')

  console.log(adminData)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page to 1 when search term changes
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = adminData.filter((item) =>
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

  const onChange = (e) => {
    console.log(e);
  };

  return (
    <>
      {PopUpData.status && (
        <PopUpInfo
          onSave={onChange}
          data={PopUpData.data}
          setPopUpData={setPopUpData}
        />
      )}
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
                <th className="px-4 py-5 ">email</th>
                <th className="px-4 py-5">Name</th>
                <th className="px-4 py-5">PhoneNumber</th>
                <th className="px-4 py-5">info</th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-tr from-black to-gray-900">
              {currentItems.map((item) => (
                <tr key={item.id} className=" hover:bg-white/10 text-center">
                  <td className="px-4 py-5">{item.email}</td>
                  <td className="px-4 py-5">{item.name}</td>
                  <td className="px-4 py-5">{item.phone}</td>
                  <td
                    onClick={() => {
                      setPopUpData({ status: true, data: item });
                    }}
                    className="px-4 py-5 text-right cursor-pointer flex justify-center"
                  >
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
    </>
  );
};

export default AdminInfo;
