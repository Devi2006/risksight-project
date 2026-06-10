import { initializeApp } from "firebase/app";

import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk4huWjVaseX8NxBQT8CKJ22OKNYbApcI",
  authDomain: "risksight-6840e.firebaseapp.com",
  projectId: "risksight-6840e",
  storageBucket: "risksight-6840e.firebasestorage.app",
  messagingSenderId: "952518371092",
  appId: "1:952518371092:web:c91f3d784f60f0e315c401",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export { addDoc, collection, getDocs };