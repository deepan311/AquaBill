import React, { useContext, useState } from "react";
import { Formik, Field, Form } from "formik";
import Logo1 from "../../asset/Logo2.png";
import { ImSpinner9 } from "react-icons/im";
import { AuthContext } from "../../AuthProvider";

function Register() {
  const [showToast, setShowToast] = useState(false);
  const [pageload, setpageload] = useState(false);
  const { signUp,error,logOut } = useContext(AuthContext);

  const errName = ()=>{
    if(error){
      if(error.includes('Firebase: Error (auth/email-already-in-use).')){
        return "User Already Exist"
      }
      else{
        return error
      }
    }
  }
   

  const initialValue = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    address: "",
    num: "",
    roll:'user'
  };

  const validate = (e) => {
    const error = {};

    function validateEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    function validatePassword(password) {
      // Minimum 8 characters and at least 1 number and 1 special character
      const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
      return re.test(password);
    }

    if (e.name.length < 1) {
      error.name = "name Required";
    }

    if (e.email.length < 1) {
      error.email = "Email Required";
    }

    if (!validatePassword(e.password)) {
      error.password =
        "Password Should have 1 number and 1 special character Minimum 8 character Example :Password@1";
    }
    if (e.password.length < 1) {
      error.password = "Password Required";
    }

    if (!validateEmail(e.email)) {
      error.email = "Email Enter Properly";
    }

    if (e.password !== e.cpassword) {
      error.cpassword = "Password Not Match";
    }

    if (e.cpassword.length < 1) {
      error.cpassword = "Conform Password Required";
    }
    if (e.address.length < 1) {
      error.address = "Address Required";
    }
    if (e.num.length < 1) {
      error.num = "Phone number Required";
    }
    return error;
  };

  const reg = async (val) => {
    setpageload(true);
   const response= await signUp(val.email, val.password, val);
   setpageload(false);
    if(response){
      logOut()
    }
   console.log(response)

  
  };


  if(showToast){
    setTimeout(() => {
      setShowToast(false);
    }, 8000);
  
  }
  return (
    <>
     

        {/* Toast Message */}
        {showToast && (
          <div className="fixed top-10 right-10 bg-green-800 text-white px-4 py-2 rounded">
            <p className="font-bold mb-1">Success!</p>
            <p>User Created Successfully you can login</p>
          </div>
        )}
      
      <div className="w-full h-auto py-2  flex justify-center items-center ">
        <div className="flex-col h-auto my-3 w-full md:w-2/3 text-white bg-gradient-to-r from-black/80 to-slate-600 rounded-md px-10 py-5 justify-between">
          <div className=" flex justify-center">
            <img src={Logo1} alt="aquaBill" className="w-2/4" />
          </div>
          <h3 className="text-center text-xl text-slate-100 font-bold">
            Create a New User
          </h3>

          <Formik
            onSubmit={reg}
            initialValues={initialValue}
            validate={validate}
          >
            {({ errors, handleBlur, touched }) => (
              <Form>
                <div className="mb-4">
                  <label className="block font-bold mb-1  ">Name</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <h2 className="text-red-700 text-sm font-bold">
                    {errors.name && touched.name && errors.name}
                  </h2>
                </div>

                {/* Email input */}
                <div className="mb-4">
                  <label className="block font-bold mb-1  ">Email</label>
                  <Field
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                    className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <h2 className="text-red-700 text-sm font-bold">
                    {errors.email && touched.email && errors.email}
                  </h2>
                </div>

                {/* password input */}
                <div className="mb-4">
                  <label className="block font-bold mb-1  ">passoword</label>
                  <Field
                    type="password"
                    placeholder="Passowrd"
                    name="password"
                    className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <h2 className="text-red-700 text-sm font-bold">
                    {errors.password && touched.password && errors.password}
                  </h2>
                </div>

                {/* conform passowrd */}
                <div className="mb-4">
                  <label className="block font-bold mb-1  ">cpassword</label>
                  <Field
                    placeholder="conform  password"
                    type="cpassword"
                    name="cpassword"
                    className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <h2 className="text-red-700 text-sm font-bold">
                    {errors.cpassword && touched.cpassword && errors.cpassword}
                  </h2>
                </div>

                {/* Address input */}
                <div className="mb-4">
                  <label className="block font-bold mb-1  ">Address</label>
                  <Field
                    name="address"
                    type="text"
                    component="textarea"
                    className="h-21 px-3 max-h-40 overflow-y outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <h2 className="text-red-700 text-sm font-bold">
                    {errors.address && touched.address && errors.address}
                  </h2>
                </div>

                {/* Number */}
                <div className="mb-4">
                  <label className="block font-bold mb-1  ">Phone</label>
                  <Field
                    type="number"
                    name="num"
                    className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <h2 className="text-red-700 text-sm font-bold">
                    {errors.num && touched.num && errors.num}
                  </h2>
                </div>

                {/* Roll */}


                <div className="mb-4">
                <label className="block font-bold mb-1  ">Roll</label>
                <Field
                  as="select"
                  name="roll"
                  className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                 
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Field>
                <h2 className="text-red-700 text-sm font-bold">
                  {errors.roll && touched.roll && errors.roll}
                </h2>
              </div>

                {pageload && (
                  <div className="w-full flex justify-center">
                    <ImSpinner9 className="text-white text-xl animate-spin" />
                  </div>
                )}
                <h2 className={`font-bold text-red-500 text-center text-md my-2`}>
                {error  && errName()}  
              </h2>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-orange-400 font-bold w-full h-10 my-5 rounded-sm text-white"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Register;
