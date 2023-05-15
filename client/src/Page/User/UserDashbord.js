import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
import { BiLoaderAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";


function UserDashbord() {
  const { logOut, fetchData, currentUser, userData } = useContext(AuthContext);
  console.log(currentUser)
  useEffect(() => {
    const fetch = async (user) => {
      await fetchData(user);
    };
    if(!userData){
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
    <div>
      <button
        onClick={() => {
          logOut();
        }}
        className="bg-red-500"
      >
        signout
      </button>

      {userData.roll==='admin' &&  <NavLink to='/admin'>
        Admin
        </NavLink>}
    </div>
  );
}

export default UserDashbord;
