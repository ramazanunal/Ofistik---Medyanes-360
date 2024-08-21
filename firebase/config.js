// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBC0IDP1ynpczFXwTAEACFZLo5c1h4fIuQ",
//   authDomain: "livechat-10e21.firebaseapp.com",
//   projectId: "livechat-10e21",
//   storageBucket: "livechat-10e21.appspot.com",
//   messagingSenderId: "89286707308",
//   appId: "1:89286707308:web:8a14e057a778e2cdcfb049",
//   measurementId: "G-SRDBPL4XKD",
// };

// const app = initializeApp(firebaseConfig);
// const firebaseDb = getStorage(app);

// export { firebaseDb };

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6Xepr0Jot09DLdJuO_4BGZzG9wkE-zik",
  authDomain: "livechat-9d6a3.firebaseapp.com",
  projectId: "livechat-9d6a3",
  storageBucket: "livechat-9d6a3.appspot.com",
  messagingSenderId: "160548974792",
  appId: "1:160548974792:web:a7f9d864d8e6f7a62135fd",
  measurementId: "G-JSQKFD5W3T"
};

const app = initializeApp(firebaseConfig);
const firebaseDb = getStorage(app);

export { firebaseDb };