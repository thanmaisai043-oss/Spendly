'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [light, setLight] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem('theme');

    if (saved === 'light') {
      document.body.className =
        'light-theme';

      setLight(true);
    } else {
      document.body.className =
        'dark-theme';

      setLight(false);
    }
  }, []);

  const toggleTheme = () => {
    if (light) {
      document.body.className =
        'dark-theme';

      localStorage.setItem(
        'theme',
        'dark'
      );

      setLight(false);
    } else {
      document.body.className =
        'light-theme';

      localStorage.setItem(
        'theme',
        'light'
      );

      setLight(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl border border-slate-500 px-4 py-2"
    >
      {light
        ? '☀️ Light'
        : '🌙 Dark'}
    </button>
  );
}