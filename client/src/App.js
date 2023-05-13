import React from 'react';
import Login from './Page/User/Login';
import AdminLogin from './Page/Admin/AdminLogin';
import AdminDashbord from './Page/Admin/Dashbord/AdminDashbord';
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
 <div>
  <Routes>
    <Route path='/' element={<>deepan</>}/>
    <Route path='/admin/*' element={<AdminDashbord/>}/>
    <Route path='/admin-login' element={<AdminLogin/>}/>
  </Routes>
 </div>
  );
}

export default App;
