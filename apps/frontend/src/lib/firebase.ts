import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:
    'AIzaSyB0dC3DIbKJYe1aHa1JMex7JCYp9csHhZ0',

  authDomain:
    'spendly-8f14c.firebaseapp.com',

  projectId: 'spendly-8f14c',

  storageBucket:
    'spendly-8f14c.firebasestorage.app',

  messagingSenderId:
    '1058551285897',

  appId:
    '1:1058551285897:web:793eab1c91b2eac6abde58',

  measurementId:
    'G-9HCWVN85CC',
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);