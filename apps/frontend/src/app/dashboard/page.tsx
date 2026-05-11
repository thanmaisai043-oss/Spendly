'use client';

import { useEffect, useState } from 'react';

import Sidebar from '@/components/layout/Sidebar';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import ExpenseList from '@/components/expenses/ExpenseList';
import ExpenseCharts from '@/components/charts/ExpenseCharts';
import ThemeToggle from '@/components/theme/ThemeToggle';
import Login from '@/components/auth/Login';

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [expenses, setExpenses] =
    useState<any[]>([]);

  const [budget, setBudget] =
    useState(0);

  const [budgetInput, setBudgetInput] =
    useState('');

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

  useEffect(() => {
    localStorage.setItem(
      'expenses',
      JSON.stringify(expenses)
    );
  }, [expenses]);

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
        <Sidebar />

        <section className="flex-1 p-5">
          {/* HEADER */}

          <div className="mb-5 flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              Spendly Dashboard
            </h1>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="rounded-xl border border-red-500 px-4 py-2"
              >
                Logout
              </button>

              <ThemeToggle />

              <button
                onClick={() => {
                  if (
                    !expenses.length
                  ) {
                    alert(
                      'No expenses to export'
                    );
                    return;
                  }

                  const csvRows = [
                    [
                      'Amount',
                      'Category',
                      'Description',
                      'Date',
                    ],
                    ...expenses.map(
                      (expense) => [
                        expense.amount,
                        expense.category,
                        expense.description,
                        expense.date,
                      ]
                    ),
                  ];

                  const csvContent =
                    csvRows
                      .map((row) =>
                        row.join(',')
                      )
                      .join('\n');

                  const blob =
                    new Blob(
                      [csvContent],
                      {
                        type: 'text/csv',
                      }
                    );

                  const link =
                    document.createElement(
                      'a'
                    );

                  link.href =
                    URL.createObjectURL(
                      blob
                    );

                  link.download =
                    'expenses.csv';

                  link.click();
                }}
                className="rounded-xl border border-slate-700 px-4 py-2"
              >
                Export CSV
              </button>
            </div>
          </div>

          {/* BUDGET */}

          <div className="mb-5 rounded-2xl bg-slate-900 p-5">
            <h2 className="mb-3 text-xl font-bold">
              Monthly Budget
            </h2>

            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Enter budget"
                value={budgetInput}
                onChange={(e) =>
                  setBudgetInput(
                    e.target.value
                  )
                }
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-3"
              />

              <button
                onClick={saveBudget}
                className="rounded-xl bg-indigo-600 px-5"
              >
                Save
              </button>
            </div>
          </div>

          {/* STATS */}

          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-indigo-600 p-5">
              <p>Total Spent</p>

              <h2 className="text-3xl font-bold">
                ₹{totalSpent}
              </h2>
            </div>

            <div className="rounded-2xl bg-green-600 p-5">
              <p>Budget</p>

              <h2 className="text-3xl font-bold">
                ₹{budget}
              </h2>
            </div>

            <div className="rounded-2xl bg-pink-600 p-5">
              <p>Remaining</p>

              <h2 className="text-3xl font-bold">
                ₹{remaining}
              </h2>
            </div>
          </div>

          {/* EMPTY */}

          {expenses.length === 0 && (
            <div className="mb-5 rounded-2xl border border-dashed border-slate-700 p-10 text-center">
              No expenses added yet 🚀
            </div>
          )}

          {/* CONTENT */}

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <ExpenseForm
              setExpenses={setExpenses}
            />

            <div className="space-y-5 lg:col-span-2">
              <ExpenseList
                expenses={expenses}
                setExpenses={setExpenses}
              />

              {expenses.length >
                0 && (
                <ExpenseCharts
                  expenses={expenses}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}