import { useState } from "react";
import EditProfile from "./EditProfile";
import Profile from "../../../asset/Logo1.png";

function AdminProfile() {
  const [profilePhoto, setProfilePhoto] = useState(Profile);
  const [coverPhoto, setCoverPhoto] = useState("/default-cover-photo.png");
  const [editProfle, seteditProfle] = useState({name:'deepan',email:'deepan@gmail',address:'123/saliyamangalam'});

  return (
    <>
      <div className="bg-gradient-to-br from-black to-gray-900 text-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-3xl font-bold">{editProfle.name}</h2>
            <p className="text-lg">{editProfle.email}</p>
            <p className="text-lg">{editProfle.address}</p>
          </div>
          <EditProfile
            setProfilePhoto={setProfilePhoto}
            setCoverPhoto={setCoverPhoto}
            seteditProfle={seteditProfle}
          />
        </div>
      </div>
    </>
  );
}
export default AdminProfile;
