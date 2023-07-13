import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
import { BiLoaderAlt } from "react-icons/bi";
import { FaHandHoldingWater,FaAmazonPay,FaGooglePay,FaPaypal } from "react-icons/fa";
import { NavLink } from "react-router-dom";


function UserDashbord() {
  const { logOut, fetchData, currentUser, userData } = useContext(AuthContext);
  console.log(currentUser)
  useEffect(() => {
    const fetch = async (user) => {
      await fetchData(user);
    };
    if (!userData) {
      fetch(currentUser);
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center w-full bg-black/20 h-screen items-center">
        <BiLoaderAlt className="text-2xl animate-spin text-black-500" />
        DataLoading...
      </div>
    );
  }

  return (
    <>
      <nav className="w-full h-11 bg-slate-700 flex items-center justify-center">
        <h2 className="text-white">Hii {userData.name}</h2>
        {userData.roll === 'admin' && <NavLink to='/admin'  className="bg-white px-4 py-1 rounded-md mx-4">Admin</NavLink >}
       
        <button onClick={()=>{
          logOut()
        }} className="bg-red-600 px-3 py-1 rounded-sm text-white">SignOut</button>
     
      </nav>
      <div className="grid grid-cols-1 gap-10 py-4 ">

        <div className="flex flex-col items-center col-span-1">
          <FaHandHoldingWater className="text-blue-500 text-[30vh] mb-1" />
          <span className="text-gray-500 text-4xl">{userData.numOfWaterUse} Liters Used</span>
        </div>
        <div className="flex flex-col items-center col-span-1">
          <h3 className="text-8xl"> ₹{userData.paymentBill}</h3>
          <div className="flex items-center justify-center w-full my-4">
            <FaAmazonPay className="text-3xl mx-2"/>
            <FaGooglePay className="text-3xl mx-2"/>
            <FaPaypal className="text-3xl mx-2"/>

          </div>
          <button className="w-2/3 py-2 bg-orange-500 rounded-md text-white">Pay</button>
        </div>
      </div>
      
      </>
  );
}

export default UserDashbord;
