import React from "react";
import { Formik, Field, Form } from "formik";
import Logo1 from "../../asset/Logo2.png";
import { ImSpinner9 } from "react-icons/im";

function AdminLogin() {
  const loginValidate = (e) => {
    let error = {};

    if (e.email.length < 1) {
      error.email = "Email Field Required";
    }
    if (e.password.length < 1) {
      error.password = "password Field Required";
    }
    return error;
  };

  const login =(val)=>{
    console.log(val)
    
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-black/80 to-slate-600">
      <div className="flex-col w-full md:w-2/6 bg-black/60 rounded-md px-10 py-5 justify-between">
        <div className=" flex justify-center">
          <img src={Logo1} alt="aquaBill" className="w-2/4" />
        </div>
        <h3 className="text-center text-xl text-slate-100 font-bold">Admin Login</h3>

        <Formik
          onSubmit={login}
          initialValues={{ email: "", password: "" }}
          validate={loginValidate}
        >
          {({ errors ,handleBlur,touched}) => (
            <Form>
              <Field
                name="email"
                type="email"
                className={`w-full h-11 my-5 px-5 outline-none `}
                placeholder="Enter Email"
                onBlur={handleBlur}
              />

              <Field
                name="password"
                type="password"
                className={`w-full h-11 my-5 px-5 outline-none `}
                placeholder="Enter password"
                onBlur={handleBlur}
              />
              <div className="w-full flex justify-center">
                <ImSpinner9 className="text-white text-xl animate-spin" />
              </div>
              <h2 className={ `font-bold text-red-500 text-center text-md my-2`}>
                {errors.email  && touched.email && errors.email}
           
              </h2>
              <h2 className={ `font-bold text-red-500 text-center text-md my-2`}>
             
                {errors.password  && touched.password && errors.password}
              </h2>
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-600 to-orange-400 font-bold w-full h-10 my-5 rounded-sm text-white"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminLogin;
