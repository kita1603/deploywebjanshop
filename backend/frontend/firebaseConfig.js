// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtcWhS32YyViKYotZHnP4jD8kUDkdtRf4",
  authDomain: "webjanshop.firebaseapp.com",
  projectId: "webjanshop",
  storageBucket: "webjanshop.appspot.com",
  messagingSenderId: "143218023851",
  appId: "1:143218023851:web:ebdcce98a5452e875986ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;