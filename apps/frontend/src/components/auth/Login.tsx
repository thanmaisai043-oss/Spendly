'use client';

import { useState } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';

export default function Login({
  setUser,
}: {
  setUser: any;
}) {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [isLogin, setIsLogin] =
    useState(true);

  const handleAuth = async () => {
    try {
      let result;

      if (isLogin) {
        result =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
      } else {
        result =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
      }

      localStorage.setItem(
        'user',
        JSON.stringify(
          result.user
        )
      );

      setUser(result.user);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-2xl bg-[#111827] p-8">
        <h1 className="mb-8 text-5xl font-bold text-white">
          Spendly
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-xl bg-[#1e293b] p-4 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-xl bg-[#1e293b] p-4 text-white outline-none"
        />

        <button
          onClick={handleAuth}
          className="w-full rounded-xl bg-purple-600 p-4 text-white"
        >
          {isLogin
            ? 'Login'
            : 'Create Account'}
        </button>

        <p
          onClick={() =>
            setIsLogin(
              !isLogin
            )
          }
          className="mt-4 cursor-pointer text-center text-gray-300"
        >
          {isLogin
            ? 'Create new account'
            : 'Already have account? Login'}
        </p>
      </div>
    </div>
  );
}