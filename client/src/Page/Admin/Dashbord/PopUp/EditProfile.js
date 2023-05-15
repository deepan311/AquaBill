import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Formik, Field, Form } from "formik";
import { ImSpinner9 } from "react-icons/im";


const EditProfilePopup = ({seteditProfle}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const init = {
    name: "",
    email: "",
    address: "",
  };

  const validate = (e) => {
    let error = {};

    if (e.email.length< 1) {
      error.email = "Enter valid Email";
    }
    if (e.name.length < 1) {
      error.name = "Enter valid name";
    }
    if (e.address.length < 5) {
      error.address = "Minimum 5 charecter";
    }
    return error;
  };

  const handleEditProfile = (e) => {
    // logic to handle editing user profile
    // e.g. call API, update state, etc.
    console.log(e)
    seteditProfle(e)
    setIsOpen(false);
  };

  return (
    <>
      {/* Button to open popup */}
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="p-2 rounded-full bg-gray-600 hover:bg-gray-500"
      >
        <FiEdit size={24} />
      </button>

      {/* Popup */}
      {isOpen && (
        <Formik initialValues={init} validate={validate} onSubmit={handleEditProfile}>
          {({errors,touched})=>(
            <Form>
            <div className="fixed top-0  right-0 h-screen w-screen flex items-center justify-center bg-black/80">
              <div className=" relative bg-gradient-to-br px-10 from-blue-400 to-blue-600 rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-medium mb-2">Edit Profile</h2>

                {/* Name input */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">Name</label>
                  <Field
                    type="text"
                    name='name'
                    className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <h2 className="text-red-700 text-sm font-bold">{errors.name && touched.name && errors.name}</h2>
                </div>

                {/* Email input */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">Email</label>
                  <Field
                    type="email"
                    name='email'
                    className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <h2 className="text-red-700 text-sm font-bold">{errors.email && touched.email && errors.email}</h2>
                 
                </div>

                {/* Address input */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">Address</label>
                  <Field
                    name='address'
                    type='text'
                    component = 'textarea'
                    className="h-21 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <h2 className="text-red-700 text-sm font-bold">{errors.address && touched.address && errors.address}</h2>
                </div>

                <div className="w-full flex justify-center">
                  <ImSpinner9 className="text-white text-xl animate-spin" />
                </div>

                {/* Edit button */}
                <div className="w-full flex justify-between">
                  <button
                  type="submit"
                    className="bg-black/80 hover:bg-black/60 text-white rounded-md py-2 px-7"
                    
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-200 hover:bg-white/60 text-black rounded-md py-2 px-7"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    type="button"
                  >
                    close
                  </button>
                </div>

                {/* Close button */}
                <button
                 type="button"  
                  className="absolute top-0 right-0 m-4 text-white hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Form>
          )}
         
        </Formik>
      )}

      {/* {isOpen && (
            <Formik 
            onSubmit={handleEditProfile}
            initialValues={init}
            validate={validate}
          >
            {({ errors }) => (
              <Form>
                <Field
                  name="name"
                  type="text"
                  className="w-full h-11 my-5 px-5 outline-none "
                  placeholder="Enter Phone Number"
                />
                 <Field
                  name="email"
                  type="email"
                  className="w-full h-11 my-5 px-5 outline-none "
                  placeholder="Enter Phone Number"
                />
                 <Field
                  name="address"
                  type="text"
                  className="w-full h-11 my-5 px-5 outline-none "
                  placeholder="Enter Phone Number"
                />
                <div className="w-full flex justify-center">
                  <ImSpinner9 className="text-white text-xl animate-spin" />
                </div>
                <h2 className="text-red-500 text-center text-xl">
                  {errors && errors.phoneNum}
                </h2>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-orange-400 font-bold w-full h-10 my-5 rounded-sm text-white"
                >
                  Send Code
                </button>
              </Form>
            )}
          </Formik>
      )} */}
    </>
  );
};

export default EditProfilePopup;
