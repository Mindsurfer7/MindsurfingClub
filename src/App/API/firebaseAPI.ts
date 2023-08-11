import { getFirestore } from 'firebase/firestore';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

export const newAPIkey = 'xxxxxxxxxxxxxxxxx';

export const GPT_API = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  headers: {
    'Authorization': `Bearer ${newAPIkey}`, //prettier-ignore
    'Content-Type': 'application/json',
    organization_id: 'org-v0i5enWH525ivYkYCD9msIqZ',
  },
  method: 'POST',
});

const firebaseConfig = {};

const firebaseApp = initializeApp(firebaseConfig);

export const authG = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export const GPT_DB = getFirestore(firebaseApp);
