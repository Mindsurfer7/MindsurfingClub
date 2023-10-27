import { getFirestore } from 'firebase/firestore';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';
import { PROFILE_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { getStorage } from 'firebase/storage';

export const GPT_API_KEY = process.env.GPT_API_KEY;
export const OPEN_AI_ORG_ID = process.env.OPEN_AI_ORG_ID;

export const GPT_API = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  headers: {
    'Authorization': `Bearer ${GPT_API_KEY}`, //prettier-ignore
    'Content-Type': 'application/json',
    'organization_id': 'org-v0i5enWH525ivYkYCD9msIqZ', //prettier-ignore
  },
  method: 'POST',
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);

export const authG = getAuth(firebaseApp);

export const googleProvider = new GoogleAuthProvider();

export const GPT_DB = getFirestore(firebaseApp);
