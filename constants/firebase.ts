import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyACLuq2_AuHJVjby3r64wQWzzSeEO_jMUU",
    authDomain: "sotraser-conductores.firebaseapp.com",
    projectId: "sotraser-conductores",
    storageBucket: "sotraser-conductores.firebasestorage.app",
    messagingSenderId: "614197859652",
    appId: "1:614197859652:web:5d10fc064d599164ab7311"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);