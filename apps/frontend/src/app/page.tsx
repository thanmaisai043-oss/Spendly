'use client';

import { useState } from 'react';

import Sidebar from '@/components/layout/Sidebar';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import ExpenseList from '@/components/expenses/ExpenseList';
import ExpenseCharts from '@/components/charts/ExpenseCharts';
import ThemeToggle from '@/components/theme/ThemeToggle';

export type Expense = {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
};

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<
    Expense[]
  >([
    {
      id: 1,
      amount: 150,
      category: 'Food',
      description: 'fried rice',
      date: '09 Apr 2026',
    },
    {
      id: 2,
      amount: 800,
      category: 'Shopping',
      description: 'clothes',
      date: '09 Apr 2026',
    },
  ]);

  const [budget, setBudget] =
    useState(15000);

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remaining = budget - totalSpent;

  return (
    <main className="min-h-screen bg-[#050816] text-white dark:bg-[#050816] dark:text-white">
      <div className="lg:flex">
        {/* SIDEBAR */}

        <div className="lg:w-[220px]">
          <Sidebar />
        </div>

        {/* MAIN */}

        <section className="flex-1 p-4 lg:p-5">
          {/* HEADER */}

          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold lg:text-3xl">
                Spendly Dashboard
              </h1>

              <p className="text-sm text-slate-400">
                Smart expense tracker
              </p>
            </div>

            {/* BUTTONS */}

            <div className="flex gap-3">
              <ThemeToggle />

              <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800">
                Export CSV
              </button>
            </div>
          </div>

          {/* STATS */}

          <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-indigo-600 p-4">
              <h3 className="text-xs">
                Total Spent
              </h3>

              <p className="mt-1 text-2xl font-bold">
                ₹{totalSpent}
              </p>
            </div>

            <div className="rounded-2xl bg-green-600 p-4">
              <h3 className="text-xs">
                Monthly Budget
              </h3>

              <p className="mt-1 text-2xl font-bold">
                ₹{budget}
              </p>
            </div>

            <div className="rounded-2xl bg-pink-600 p-4">
              <h3 className="text-xs">
                Remaining
              </h3>

              <p className="mt-1 text-2xl font-bold">
                ₹{remaining}
              </p>
            </div>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* LEFT */}

            <div>
              <ExpenseForm
                setExpenses={setExpenses}
              />
            </div>

            {/* RIGHT */}

            <div className="space-y-4 lg:col-span-2">
              <ExpenseList
                expenses={expenses}
                setExpenses={setExpenses}
              />

              <ExpenseCharts />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}