import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { ImSpinner9 } from "react-icons/im";
import { FiEdit } from "react-icons/fi";

function PopUpInfo({ data, setPopUpData, onSave }) {
  console.log(data);
  const [edit, setedit] = useState(false);

  const init = {
    name: data.name || "",
    email: data.email || "",
    address: data.address || "",
    roll: data.roll || "",
    PendingAmount: data.PendingAmount || "",
  };

  const validate = (e) => {
    let error = {};

    if (e.email.length < 1) {
      error.email = "Enter valid Email";
    }
    if (e.name.length < 1) {
      error.name = "";
    }
    if (e.address.length < 5) {
      error.address = "Minimum 5 charecter";
    }
    if (e.PendingAmount.length < 1) {
      error.PendingAmount = "Enter valid PendingAmount";
    }
    return error;
  };

  const handleEditProfile = (e) => {
    // logic to handle editing user profile
    // e.g. call API, update state, etc.
    console.log(e);

    setPopUpData({ status: false, data: null });
  };

  return (
    <Formik initialValues={init} validate={validate} onSubmit={onSave}>
      {({ errors, touched }) => (
        <Form>
          <div className="fixed top-0  right-0 h-screen w-screen flex items-center justify-center bg-black/80">
            <div className=" relative bg-gradient-to-br px-10 from-blue-400 to-blue-600 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-medium mb-2">Edit Profile</h2>
              <button
                type="button"
                onClick={() => {
                  setedit(true);
                }}
                className="p-2 text-white  w-full flex justify-end "
              >
                <h2>edit</h2>
                <FiEdit className="text-xl  rounded" />
              </button>

              {/* Name input */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Name</label>
                <Field
                  disabled={!edit}
                  type="text"
                  name="name"
                  className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <h2 className="text-red-700 text-sm font-bold">
                  {errors.name && touched.name && errors.name}
                </h2>
              </div>

              {/* Email input */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Email</label>
                <Field
                  disabled={!edit}
                  type="email"
                  name="email"
                  className="h-9 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <h2 className="text-red-700 text-sm font-bold">
                  {errors.email && touched.email && errors.email}
                </h2>
              </div>

              {/* Address input */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Address</label>
                <Field
                  disabled={!edit}
                  name="address"
                  type="text"
                  component="textarea"
                  className="h-21 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <h2 className="text-red-700 text-sm font-bold">
                  {errors.address && touched.address && errors.address}
                </h2>
              </div>

              {/* PendingAmount */}
              <div className="mb-4">
                <label className="block font-medium mb-1">PendingAmount</label>
                <Field
                  disabled={!edit}
                  name="PendingAmount"
                  type="text"
                  className="h-21 px-3 outline-none block w-full text-black rounded-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <h2 className="text-red-700 text-sm font-bold">
                  {errors.address && touched.address && errors.address}
                </h2>
              </div>

              {/* Roll */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Roll</label>
                <Field
                  as="select"
                  disabled={!edit}
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

              <div className="w-full flex justify-center">
                <ImSpinner9 className="text-white text-xl animate-spin" />
              </div>

              {/* Edit button */}
              <div className="w-full flex justify-between">
                <button
                  disabled={!edit}
                  type="submit"
                  className="bg-black/80 hover:bg-black/60 text-white rounded-md py-2 px-7"
                >
                  Save
                </button>
                <button
                  className="bg-red-200 hover:bg-white/60 text-black rounded-md py-2 px-7"
                  onClick={() => {
                    setPopUpData({ status: false, data: null });
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
                onClick={() => setPopUpData({ status: false, data: null })}
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
  );
}

export default PopUpInfo;
