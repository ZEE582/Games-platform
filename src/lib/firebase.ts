import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTv-zifJWNpIAvlF16Jdjpl6Ao9a_r6rY",
  authDomain: "gaming-platform-64b7a.firebaseapp.com",
  projectId: "gaming-platform-64b7a",
  storageBucket: "gaming-platform-64b7a.firebasestorage.app",
  messagingSenderId: "548212520476",
  appId: "1:548212520476:web:bba768fc397e808f5651d9",
  measurementId: "G-M0N6YP88WN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
