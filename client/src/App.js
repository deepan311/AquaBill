import React, { useContext,useEffect } from "react";
import Login from "./Page/User/Login";
import AdminLogin from "./Page/Admin/AdminLogin";
import AdminDashbord from "./Page/Admin/Dashbord/AdminDashbord";
import { Routes, Route } from "react-router-dom";
import Register from "./Page/User/Register";

import LoginProtected from "./Page/ProtectRoute/LoginProtected";
import HomeProtected from "./Page/ProtectRoute/HomeProtected";
import UserDashbord from "./Page/User/UserDashbord";
import { AuthContext } from "./AuthProvider";

function App() {
  const { logOut, fetchData, currentUser, userData } = useContext(AuthContext);
  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      const fetch = async (user) => {
        await fetchData(user);
      };
      if (!userData) {
        fetch(currentUser);
      }
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomeProtected>
              <UserDashbord />
            </HomeProtected>
          }
        />
        <Route
          path="/login"
          element={
            <LoginProtected>
              <Login />
            </LoginProtected>
          }
        />
     
        <Route path="/admin/*" element={<AdminDashbord />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
