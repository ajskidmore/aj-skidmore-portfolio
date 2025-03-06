// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA6j8s7mN8GxwtyNZQGNxuvdUwsfdlz-ys",
    authDomain: "aj-skidmore-portfolio.firebaseapp.com",
    projectId: "aj-skidmore-portfolio",
    storageBucket: "aj-skidmore-portfolio.firebasestorage.app",
    messagingSenderId: "388110520086",
    appId: "1:388110520086:web:58158c7137e7b99701ca37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };