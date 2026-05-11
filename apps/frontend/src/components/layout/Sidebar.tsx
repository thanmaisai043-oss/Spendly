'use client';

export default function Sidebar() {
  return (
    <aside className="min-h-screen border-r border-slate-800 bg-[#040814] p-5">
      {/* LOGO */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-indigo-500">
          Spendly
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Smart Finance Tracker
        </p>
      </div>

      {/* MENU */}

      <nav className="space-y-3">
        <button className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-left font-medium text-white">
          Dashboard
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800">
          Expenses
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800">
          Tasks
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800">
          Notes
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800">
          Analytics
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800">
          Settings
        </button>
      </nav>
    </aside>
  );
}