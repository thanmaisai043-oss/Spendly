'use client';

import { useState } from 'react';

export default function Login({
  setIsLoggedIn,
}: any) {
  const [isSignup, setIsSignup] =
    useState(false);

  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  /* SIGN UP */

  const signup = () => {
    if (
      !username ||
      !password
    ) {
      setError(
        'Please fill all fields'
      );
      return;
    }

    localStorage.setItem(
      'savedUser',
      username
    );

    localStorage.setItem(
      'savedPass',
      password
    );

    alert(
      'Account created successfully'
    );

    setIsSignup(false);
  };

  /* LOGIN */

  const login = () => {
    const savedUser =
      localStorage.getItem(
        'savedUser'
      );

    const savedPass =
      localStorage.getItem(
        'savedPass'
      );

    if (
      username === savedUser &&
      password === savedPass
    ) {
      localStorage.setItem(
        'user',
        username
      );

      setIsLoggedIn(true);
    } else {
      setError(
        'Invalid username or password'
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] p-5">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 p-8 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Spendly
        </h1>

        <p className="mb-6 text-slate-400">
          {isSignup
            ? 'Create Account'
            : 'Login to continue'}
        </p>

        {/* USERNAME */}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        {/* ERROR */}

        {error && (
          <p className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* BUTTON */}

        <button
          onClick={
            isSignup
              ? signup
              : login
          }
          className="w-full rounded-xl bg-violet-600 p-3 font-semibold text-white"
        >
          {isSignup
            ? 'Create Account'
            : 'Login'}
        </button>

        {/* TOGGLE */}

        <button
          onClick={() => {
            setIsSignup(
              !isSignup
            );

            setError('');
          }}
          className="mt-4 w-full text-sm text-slate-400"
        >
          {isSignup
            ? 'Already have an account? Login'
            : 'Create new account'}
        </button>
      </div>
    </div>
  );
}