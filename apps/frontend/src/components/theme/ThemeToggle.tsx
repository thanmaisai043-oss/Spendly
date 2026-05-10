'use client';

import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme(
          theme === 'dark'
            ? 'light'
            : 'dark'
        )
      }
      className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
    >
      {theme === 'dark'
        ? '☀️ Light'
        : '🌙 Dark'}
    </button>
  );
}