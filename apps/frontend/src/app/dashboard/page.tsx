'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme');

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }

    const user = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    if (user?.email) {
      setUserEmail(user.email);

      const savedExpenses =
        localStorage.getItem(
          `expenses_${user.email}`
        );

      const savedBudget =
        localStorage.getItem(
          `budget_${user.email}`
        );

      if (savedExpenses) {
        setExpenses(
          JSON.parse(savedExpenses)
        );
      }

      if (savedBudget) {
        setBudget(Number(savedBudget));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(
        `expenses_${userEmail}`,
        JSON.stringify(expenses)
      );
    }
  }, [expenses, userEmail]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(
        `budget_${userEmail}`,
        String(budget)
      );
    }
  }, [budget, userEmail]);

  const addExpense = () => {
    if (!amount || !category || !date) {
      alert('Fill all fields');
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      category,
      date,
    };

    const updatedExpenses = [
      ...expenses,
      newExpense,
    ];

    setExpenses(updatedExpenses);

    localStorage.setItem(
      `expenses_${userEmail}`,
      JSON.stringify(updatedExpenses)
    );

    setAmount('');
    setCategory('');
    setDate('');
  };

  const deleteExpense = (id: number) => {
    const updatedExpenses =
      expenses.filter(
        (expense) => expense.id !== id
      );

    setExpenses(updatedExpenses);

    localStorage.setItem(
      `expenses_${userEmail}`,
      JSON.stringify(updatedExpenses)
    );
  };

  const totalSpent = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const remaining = budget - totalSpent;

  const categoryTotals = [
    ...new Set(
      expenses.map((e) => e.category)
    ),
  ].map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce(
        (acc, e) => acc + e.amount,
        0
      );

    return {
      category: cat,
      total,
    };
  });

  const colors = [
    '#8b5cf6',
    '#ec4899',
    '#22c55e',
    '#f59e0b',
    '#06b6d4',
  ];

  let currentPercent = 0;

  const gradient = categoryTotals
    .map((item, index) => {
      const percent =
        totalSpent > 0
          ? (item.total / totalSpent) * 100
          : 0;

      const start = currentPercent;

      currentPercent += percent;

      return `${
        colors[index % colors.length]
      } ${start}% ${currentPercent}%`;
    })
    .join(',');

  const bgMain = darkMode
    ? 'bg-[#050816] text-white'
    : 'bg-[#f4f7fb] text-black';

  const cardBg = darkMode
    ? 'bg-white/5 border-white/10'
    : 'bg-white border-gray-200';

  const inputBg = darkMode
    ? 'bg-white/5 border-white/10 text-white'
    : 'bg-gray-50 border-gray-200 text-black';

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${bgMain}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              Spendly
            </h1>

            <p className="opacity-60 mt-2">
              Smart expense management
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold shadow-lg hover:scale-105 transition-all"
            >
              {darkMode
                ? '☀ Light'
                : '🌙 Dark'}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem(
                  'user'
                );

                window.location.reload();
              }}
              className="px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          <div
            className={`lg:col-span-1 backdrop-blur-xl border rounded-3xl p-6 shadow-2xl ${cardBg}`}
          >
            <h2 className="text-2xl font-bold mb-6">
              Add Expense
            </h2>

            <div className="space-y-4">

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                className={`w-full p-4 rounded-2xl border outline-none ${inputBg}`}
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className={`w-full p-4 rounded-2xl border outline-none ${inputBg}`}
              />

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
                className={`w-full p-4 rounded-2xl border outline-none ${inputBg}`}
              />

              <input
                type="number"
                placeholder="Monthly Budget"
                value={budget}
                onChange={(e) =>
                  setBudget(
                    Number(
                      e.target.value
                    )
                  )
                }
                className={`w-full p-4 rounded-2xl border outline-none ${inputBg}`}
              />

              <button
                onClick={addExpense}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg shadow-xl hover:scale-[1.02] transition-all"
              >
                Add Expense
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">

            <div className="grid md:grid-cols-3 gap-5">

              <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-600 to-purple-800 shadow-2xl">
                <p className="opacity-70">
                  Total Spent
                </p>

                <h2 className="text-4xl font-black mt-3">
                  ₹{totalSpent}
                </h2>
              </div>

              <div className="rounded-3xl p-6 bg-gradient-to-br from-green-500 to-green-700 shadow-2xl">
                <p className="opacity-70">
                  Budget
                </p>

                <h2 className="text-4xl font-black mt-3">
                  ₹{budget}
                </h2>
              </div>

              <div className="rounded-3xl p-6 bg-gradient-to-br from-pink-500 to-pink-700 shadow-2xl">
                <p className="opacity-70">
                  Remaining
                </p>

                <h2 className="text-4xl font-black mt-3">
                  ₹{remaining}
                </h2>
              </div>
            </div>

            <div
              className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${cardBg}`}
            >

              <div className="flex flex-col lg:flex-row items-center gap-12">

                <div className="relative">

                  <div
                    className="rounded-full shadow-[0_0_60px_rgba(168,85,247,0.4)]"
                    style={{
                      width: '300px',
                      height: '300px',
                      background: `conic-gradient(${gradient})`,
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">

                    <div
                      className={`w-36 h-36 rounded-full flex flex-col items-center justify-center ${
                        darkMode
                          ? 'bg-[#050816]'
                          : 'bg-white'
                      }`}
                    >
                      <p className="opacity-60 text-sm">
                        Total
                      </p>

                      <h2 className="text-3xl font-black">
                        ₹{totalSpent}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full">

                  <h2 className="text-3xl font-bold mb-6">
                    Expense Analytics
                  </h2>

                  <div className="space-y-4">

                    {categoryTotals.map(
                      (
                        item,
                        index
                      ) => {
                        const percentage =
                          totalSpent > 0
                            ? (
                                (item.total /
                                  totalSpent) *
                                100
                              ).toFixed(1)
                            : 0;

                        return (
                          <div
                            key={
                              item.category
                            }
                            className={`p-5 rounded-2xl border ${
                              darkMode
                                ? 'bg-white/5 border-white/10'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >

                            <div className="flex justify-between items-center mb-3">

                              <div className="flex items-center gap-3">

                                <div
                                  className="w-5 h-5 rounded-full"
                                  style={{
                                    background:
                                      colors[
                                        index %
                                          colors.length
                                      ],
                                  }}
                                />

                                <div>
                                  <p className="text-xl font-semibold capitalize">
                                    {
                                      item.category
                                    }
                                  </p>

                                  <p className="opacity-60 text-sm">
                                    ₹
                                    {
                                      item.total
                                    }
                                  </p>
                                </div>
                              </div>

                              <h3 className="text-2xl font-bold">
                                {
                                  percentage
                                }
                                %
                              </h3>
                            </div>

                            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">

                              <div
                                className="h-3 rounded-full"
                                style={{
                                  width: `${percentage}%`,
                                  background:
                                    colors[
                                      index %
                                        colors.length
                                    ],
                                }}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${cardBg}`}
            >

              <h2 className="text-3xl font-bold mb-6">
                Expense History
              </h2>

              <div className="space-y-4">

                {expenses.length === 0 && (
                  <p className="opacity-60 text-center">
                    No expenses added
                  </p>
                )}

                {expenses.map(
                  (expense) => (
                    <div
                      key={
                        expense.id
                      }
                      className={`flex justify-between items-center p-5 rounded-2xl border ${
                        darkMode
                          ? 'bg-white/5 border-white/10'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >

                      <div>
                        <h3 className="text-xl font-semibold capitalize">
                          {
                            expense.category
                          }
                        </h3>

                        <p className="opacity-60 text-sm mt-1">
                          {
                            expense.date
                          }
                        </p>
                      </div>

                      <div className="flex items-center gap-5">

                        <h2 className="text-2xl font-black text-pink-500">
                          ₹
                          {
                            expense.amount
                          }
                        </h2>

                        <button
                          onClick={() =>
                            deleteExpense(
                              expense.id
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}