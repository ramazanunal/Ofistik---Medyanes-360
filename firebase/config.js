// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBC0IDP1ynpczFXwTAEACFZLo5c1h4fIuQ",
  authDomain: "livechat-10e21.firebaseapp.com",
  projectId: "livechat-10e21",
  storageBucket: "livechat-10e21.appspot.com",
  messagingSenderId: "89286707308",
  appId: "1:89286707308:web:8a14e057a778e2cdcfb049",
  measurementId: "G-SRDBPL4XKD",
};

const app = initializeApp(firebaseConfig);
const firebaseDb = getStorage(app);

export { firebaseDb };
