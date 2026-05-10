'use client';

import { useState } from 'react';

export default function Sidebar() {
  const [active, setActive] =
    useState('Expenses');

  const menuItems = [
    'Dashboard',
    'Expenses',
    'Tasks',
    'Notes',
    'Analytics',
    'Settings',
  ];

  return (
    <aside className="flex h-screen flex-col border-r border-slate-800 bg-[#0B1120] p-4 text-white">
      {/* LOGO */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-indigo-400">
          Spendly
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Smart Finance Tracker
        </p>
      </div>

      {/* MENU */}

      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
              active === item
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* FOOTER */}

      <div className="mt-auto rounded-2xl bg-slate-900 p-4">
        <h3 className="text-sm font-semibold">
          Monthly Budget
        </h3>

        <p className="mt-2 text-2xl font-bold text-green-400">
          ₹15,000
        </p>

        <div className="mt-3 h-2 rounded-full bg-slate-800">
          <div className="h-2 w-[70%] rounded-full bg-green-500"></div>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          70% budget remaining
        </p>
      </div>
    </aside>
  );
}