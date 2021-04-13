import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyA7QBPPAWO273qrOJ1gsUWTeIOZkQ5K1kk",
  authDomain: "slider-3ff66.firebaseapp.com",
  projectId: "slider-3ff66",
  storageBucket: "slider-3ff66.appspot.com",
  messagingSenderId: "1028017113734",
  appId: "1:1028017113734:web:a7c2f899a415af01f89f07",
  measurementId: "G-9T3MPBTFZ7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage= firebase.storage()
export {storage,firebase as fire }