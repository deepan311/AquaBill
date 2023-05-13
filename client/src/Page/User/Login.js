import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Logo1 from "../../asset/Logo2.png";
import { ImSpinner9 } from "react-icons/im";

function Login() {
  const [otp, setotp] = useState({ num: null, status: false });

  const sendCodeValidate = (e) => {
    let error = {};

    if (e.phoneNum.length >= 11) {
      error.phoneNum = "minimum 10 Cheracter";
    }
    if (e.phoneNum.length < 1) {
      error.phoneNum = "Enter Valid Number";
    }
    return error;
  };

  const loginValidate = (e) => {
    let error = {};
    if (e.validNum.length < 1) {
      error.validNum = "Enter Valid Number";
    }
    return error;
  };

  const sendCode = (value, action) => {
    console.log(value);
    setotp({ status: true, num: value.phoneNum });
    action.setSubmitting(false);
  };

  const login = (e) => {
    console.log(e);
  };

  return (
    <div className="w-full flex h-screen items-center justify-center bg-gradient-to-r from-indigo-800 to-blue-500">
      <div className="flex-col w-full md:w-2/6 bg-black/60 rounded-md px-10 py-5 justify-between">
        <div className=" flex justify-center">
          <img src={Logo1} alt="aquaBill" className="w-2/4" />
        </div>

        {!otp.status ? (
          <Formik 
            onSubmit={sendCode}
            initialValues={{ phoneNum: "", validNum: "" }}
            validate={sendCodeValidate}
          >
            {({ errors }) => (
              <Form>
                <Field
                  name="phoneNum"
                  type="number"
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
        ) : (
          <Formik onSubmit={login} validate={loginValidate}>
            {({ errors }) => (
              <Form>
                <h3 className="text-white text-center font-bold">
                  OTP Send Successfully{" "}
                  <span className="text-emerald-300">{otp.num} </span>
                  <span className="text-blue-400 underline cursor-pointer">
                    Resend{" "}
                  </span>
                </h3>
                <Field
                  name="validNum"
                  type="number"
                  className="w-full h-11 my-5 px-5 outline-none "
                  placeholder="Enter OTP Code"
                />
                <div className="w-full flex justify-center">
                  <ImSpinner9 className="text-white text-xl animate-spin" />
                </div>
                <h2 className="text-red-500 text-center text-xl">
                  {errors && errors.validNum}
                </h2>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-orange-400 font-bold w-full h-10 my-5 rounded-sm text-white"
                >
                  Submit Code
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

export default Login;
