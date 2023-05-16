import React, { useState, useEffect, createContext, useRef } from "react";
import {
  auth,
  firestore,
  createUserDoc,
  deleteUserAndData,
} from "./firebase/config";
import { doc, getDoc, setDoc, collection, onSnapshot } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  serverT,
} from "firebase/auth";
import { BiLoaderAlt } from "react-icons/bi";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [allData, setallData] = useState([]);

  const isSigningUp = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!isSigningUp.current) {
        setCurrentUser(user);
      }
      setLoading(false);

    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await createUserDoc(user, { name: "deepannn" });
      return user;
    } catch (error) {
      setError( error.message);
    }
  };

  const fetchData = async (user) => {
    return new Promise(async (resolve, reject) => {
      const userId = user.uid;
      const useRef = await doc(firestore, "samData", userId);
      const snapshot = await getDoc(useRef);
      const data = await snapshot.data();
      console.log(data);
      if (data) {
        setUserData({ ...data, createAt: data.createAt.toString() });
        resolve({ ...data, createAt: data.createAt.toString() });
        console.log(userData);
      } else {
        setError("No fetch Data");
        reject("no fetch data");
      }
    });
  };

  const fetchAllData = async () => {


    const collectionRef = collection(firestore, "samData");

    // Subscribe to the collection data
    await onSnapshot(collectionRef, (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        // Add each document data to the docs array
        docs.push({ id: doc.id, ...doc.data() });
      });
      setallData(docs);
    });

  }
  const signUp = async (email, password, addData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      isSigningUp.current = true;
      setLoading(true);
      console.log(userCredential);
      await createUserDoc(userCredential.user, addData)
        .then(async (res) => {
          console.log("userdata create successfully");
          await sendEmailVerification(userCredential.user).then((send) => {
            console.log("VerifyLink Send successfully");

          });
        })
        .catch(async (err) => {
          await deleteUserAndData(userCredential.user);
        });
      return userCredential
      setLoading(false);
    } catch (error) {
      setError(error.message || error);
      setLoading(false);
    }
  };

  const createUser = async (user, addData) => {
    return await createUserDoc(user, addData)
      .then(async () => {
        // await fetchData(user)
        return true;
      })
      .catch((err) => {
        setError("create user Error");
        return err;
      });
  };

  const logOut = async () => {
    setCurrentUser(null);
    setUserData(null);
    setError(null);
    return signOut(auth);
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    loading,
    fetchData,
    userData,
    logOut,
    error,
    createUser,
    setError,
    setLoading,
    fetchAllData,
    allData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="flex justify-center w-full bg-black/10 h-screen items-center">
          <BiLoaderAlt className="text-2xl animate-spin text-black-500" />Loading...
        </div>
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
