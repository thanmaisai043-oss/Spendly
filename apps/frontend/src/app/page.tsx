'use client';

import { useEffect, useState } from 'react';

import Sidebar from '@/components/layout/Sidebar';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import ExpenseList from '@/components/expenses/ExpenseList';
import ExpenseCharts from '@/components/charts/ExpenseCharts';
import ThemeToggle from '@/components/theme/ThemeToggle';
import AIInsights from '@/components/ai/AIInsights';
import Login from '@/components/auth/Login';

export type Expense = {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
};

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [budget, setBudget] =
    useState<number>(0);

  const [budgetInput, setBudgetInput] =
    useState('');

  /* LOAD USER */

  useEffect(() => {
    const user =
      localStorage.getItem('user');

    if (user) {
      setIsLoggedIn(true);
    }

    const savedExpenses =
      localStorage.getItem('expenses');

    const savedBudget =
      localStorage.getItem('budget');

    if (savedExpenses) {
      setExpenses(
        JSON.parse(savedExpenses)
      );
    }

    if (savedBudget) {
      setBudget(Number(savedBudget));
      setBudgetInput(savedBudget);
    }
  }, []);

  /* SAVE EXPENSES */

  useEffect(() => {
    localStorage.setItem(
      'expenses',
      JSON.stringify(expenses)
    );
  }, [expenses]);

  /* SAVE BUDGET */

  useEffect(() => {
    localStorage.setItem(
      'budget',
      budget.toString()
    );
  }, [budget]);

  const totalSpent = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const remaining =
    budget - totalSpent;

  const saveBudget = () => {
    setBudget(Number(budgetInput));
  };

  /* LOGIN SCREEN */

  if (!isLoggedIn) {
    return (
      <Login
        setIsLoggedIn={
          setIsLoggedIn
        }
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
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

            <div className="flex gap-3">
              <button
                onClick={() => {
                  localStorage.removeItem(
                    'user'
                  );

                  localStorage.removeItem(
                    'expenses'
                  );

                  localStorage.removeItem(
                    'budget'
                  );

                  window.location.reload();
                }}
                className="rounded-xl border border-red-500 px-4 py-2 text-sm text-red-400"
              >
                Logout
              </button>

              <ThemeToggle />

              <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800">
                Export CSV
              </button>
            </div>
          </div>

          {/* BUDGET */}

          <div className="mb-5 rounded-2xl bg-slate-900 p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Monthly Budget
            </h2>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="number"
                placeholder="Enter monthly budget"
                value={budgetInput}
                onChange={(e) =>
                  setBudgetInput(
                    e.target.value
                  )
                }
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
              />

              <button
                onClick={saveBudget}
                className="rounded-xl bg-violet-600 px-5 py-3 font-semibold"
              >
                Save Budget
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

          {/* EMPTY STATE */}

          {expenses.length === 0 && (
            <div className="mb-5 rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
              No expenses added yet 🚀
            </div>
          )}

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

              {expenses.length > 0 && (
                <>
                  <ExpenseCharts
                    expenses={expenses}
                  />

                  <AIInsights
                    expenses={expenses}
                    budget={budget}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}