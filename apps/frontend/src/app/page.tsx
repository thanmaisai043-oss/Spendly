'use client';

import { useEffect, useState } from 'react';

import Login from '@/components/auth/Login';
import DashboardPage from './dashboard/page';

export default function Home() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        'user'
      );

    if (savedUser) {
      setUser(
        JSON.parse(savedUser)
      );
    }
  }, []);

  if (!user) {
    return (
      <Login
        setUser={setUser}
      />
    );
  }

  return (
    <DashboardPage />
  );
}