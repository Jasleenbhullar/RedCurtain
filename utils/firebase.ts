// utils/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSaVjVz9kaBRE0ogD3PeTrn291Ipn4Q48",
  authDomain: "redcurtain-5f4e8.firebaseapp.com",
  projectId: "redcurtain-5f4e8",
  storageBucket: "redcurtain-5f4e8.firebasestorage.app",
  messagingSenderId: "231674024407",
  appId: "1:231674024407:web:afa44a44a48d13cbef7b92"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
