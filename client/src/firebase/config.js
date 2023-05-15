import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBcqvgdY2xTo03g1pa8ZcJzaK7nO6F92OM",
  authDomain: "aquabill.firebaseapp.com",
  projectId: "aquabill",
  storageBucket: "aquabill.appspot.com",
  messagingSenderId: "813058271268",
  appId: "1:813058271268:web:80d909e18fa4d9899890b1",
  measurementId: "G-CQVK2PQ3JZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);



export const createUserDoc = async (user, addData) => {
  const userId = user.uid;

  const useRef = doc(firestore, "samData", userId);

  const snapshot = await getDoc(useRef);

  if (!snapshot.exists()) {
    const { email } = user;

    const info = await setDoc(useRef, {
      email,
      name:addData.password,
      address:addData.address,
      phone:addData.num,
      paymentBill:null,
      numOfWaterUse:0,
      createAt: serverTimestamp(),
      roll:'user'
    });
    // console.log(first)
    return true;
  } else {
    return false;
  }
};

export const deleteUserAndData = async (user) => {
  try {
    await deleteUser(user).then(async (uid) => {
      const useRef = doc(firestore, "samData", uid);
      const snapshot = await getDoc(useRef);
      console.log("snapshot on deleteUser", snapshot);
      if (snapshot.exists()) {
        return await deleteDoc(useRef).then((res) => {
          console.log("deleteData");
          return 
        });
      } else {
        console.log("no Data Found This user");
      }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

// export const checkUser = async () => {
//   return await onAuthStateChanged(auth, (user) => {
//     if (user) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// };
