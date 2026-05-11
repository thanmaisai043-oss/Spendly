'use client';

import { useEffect, useState } from 'react';

type Expense = {
  id: number;
  amount: number;
  category: string;
  date: string;
};

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login + Signup form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setDarkMode(savedTheme === 'dark');

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.email) {
      setUserEmail(user.email);
      setIsLoggedIn(true);

      const savedExpenses = localStorage.getItem(`expenses_${user.email}`);
      const savedBudget = localStorage.getItem(`budget_${user.email}`);
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
      if (savedBudget) setBudget(Number(savedBudget));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`expenses_${userEmail}`, JSON.stringify(expenses));
    }
  }, [expenses, userEmail]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`budget_${userEmail}`, String(budget));
    }
  }, [budget, userEmail]);

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter email and password.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(
      (u: any) => u.email === loginEmail && u.password === loginPassword
    );

    if (!existingUser) {
      setLoginError('Invalid email or password.');
      return;
    }

    const user = { email: loginEmail };
    localStorage.setItem('user', JSON.stringify(user));
    setUserEmail(loginEmail);
    setIsLoggedIn(true);
    setLoginError('');

    const savedExpenses = localStorage.getItem(`expenses_${loginEmail}`);
    const savedBudget = localStorage.getItem(`budget_${loginEmail}`);
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedBudget) setBudget(Number(savedBudget));
  };

  const handleSignup = () => {
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter email and password.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const alreadyExists = users.find((u: any) => u.email === loginEmail);

    if (alreadyExists) {
      setLoginError('Account already exists.');
      return;
    }

    const newUser = { email: loginEmail, password: loginPassword };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setLoginError('Account created successfully. Please login.');
    setIsSignup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserEmail('');
    setExpenses([]);
    setBudget(0);
    setLoginEmail('');
    setLoginPassword('');
  };

  const addExpense = () => {
    if (!amount || !category || !date) return;
    const newExpense = { id: Date.now(), amount: Number(amount), category, date };
    setExpenses([...expenses, newExpense]);
    setAmount('');
    setCategory('');
    setDate('');
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalSpent;
  const highestExpense = expenses.length > 0
    ? expenses.reduce((max, e) => e.amount > max.amount ? e : max)
    : null;

  const categoryTotals = [...new Set(expenses.map((e) => e.category))].map((cat) => ({
    category: cat,
    total: expenses.filter((e) => e.category === cat).reduce((acc, e) => acc + e.amount, 0),
  }));

  const colors = ['#8b5cf6', '#ec4899', '#22c55e', '#f59e0b', '#06b6d4'];
  let currentPercent = 0;
  const gradient = categoryTotals.map((item, index) => {
    const percent = totalSpent > 0 ? (item.total / totalSpent) * 100 : 0;
    const start = currentPercent;
    currentPercent += percent;
    return `${colors[index % colors.length]} ${start}% ${currentPercent}%`;
  }).join(',');

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
          darkMode ? 'bg-[#070B14] text-white' : 'bg-[#f5f7fb] text-black'
        }`}
      >
        <div
          className={`w-full max-w-sm rounded-3xl border p-8 shadow-2xl ${
            darkMode ? 'border-slate-800 bg-slate-900/70' : 'border-gray-200 bg-white'
          }`}
        >
          <h1 className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-4xl font-black text-transparent text-center mb-1">
            Spendly
          </h1>

          <p className={`text-center text-sm mb-8 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Smart expense management
          </p>

          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className={`w-full rounded-2xl border p-3.5 text-sm outline-none ${
                darkMode
                  ? 'border-slate-800 bg-slate-950 text-white'
                  : 'border-gray-200 bg-gray-100 text-black'
              }`}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && (isSignup ? handleSignup() : handleLogin())
              }
              className={`w-full rounded-2xl border p-3.5 text-sm outline-none ${
                darkMode
                  ? 'border-slate-800 bg-slate-950 text-white'
                  : 'border-gray-200 bg-gray-100 text-black'
              }`}
            />

            {loginError && (
              <p className="text-xs text-red-400 px-1">{loginError}</p>
            )}

            <button
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 p-3.5 text-sm font-bold transition hover:scale-[1.01]"
            >
              {isSignup ? 'Create Account' : 'Login'}
            </button>

            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setLoginError('');
              }}
              className="w-full text-sm text-violet-400 hover:underline"
            >
              {isSignup
                ? 'Already have an account? Login'
                : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-[#070B14] text-white' : 'bg-[#f5f7fb] text-black'}`}>
      <div className="mx-auto max-w-7xl px-5 py-6">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-4xl font-black text-transparent">
              Spendly
            </h1>
            <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              Smart expense management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 px-4 py-2.5 text-sm font-semibold transition hover:scale-105"
            >
              {darkMode ? '☀ Light' : '🌙 Dark'}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">

          <div className="space-y-5 lg:col-span-4">

            <div className={`rounded-3xl border p-5 shadow-xl ${darkMode ? 'border-slate-800 bg-slate-900/70' : 'border-gray-200 bg-white'}`}>
              <h2 className="mb-5 text-xl font-bold">Add Expense</h2>
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full rounded-2xl border p-3.5 text-sm outline-none ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-gray-200 bg-gray-100'}`}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full rounded-2xl border p-3.5 text-sm outline-none ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-gray-200 bg-gray-100'}`}
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full rounded-2xl border p-3.5 text-sm outline-none ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-gray-200 bg-gray-100'}`}
                />
                <input
                  type="number"
                  placeholder="Monthly Budget"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className={`w-full rounded-2xl border p-3.5 text-sm outline-none ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-gray-200 bg-gray-100'}`}
                />
                <button
                  onClick={addExpense}
                  className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 p-3.5 text-sm font-bold transition hover:scale-[1.01]"
                >
                  Add Expense
                </button>
              </div>
            </div>

            <div className={`rounded-3xl border p-5 shadow-xl ${darkMode ? 'border-slate-800 bg-slate-900/70' : 'border-gray-200 bg-white'}`}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">AI Insights</h2>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Smart analysis</p>
                </div>
                <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs text-violet-400">AI</span>
              </div>

              <div className="space-y-3">
                <div className={`rounded-2xl p-4 ${darkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
                  <p className="text-xs text-slate-400">Total Spending</p>
                  <h3 className="mt-1 text-xl font-black text-red-400">₹{totalSpent}</h3>
                </div>
                <div className={`rounded-2xl p-4 ${darkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
                  <p className="text-xs text-slate-400">Remaining Budget</p>
                  <h3 className="mt-1 text-xl font-black text-green-400">₹{remaining}</h3>
                </div>
                {highestExpense && (
                  <div className={`rounded-2xl p-4 ${darkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
                    <p className="text-xs text-slate-400">Highest Expense</p>
                    <h3 className="mt-1 text-sm font-bold text-yellow-400">
                      {highestExpense.category} — ₹{highestExpense.amount}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-8">

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-violet-800 p-5 shadow-xl">
                <p className="text-xs opacity-70">Total Spent</p>
                <h2 className="mt-2 text-3xl font-black">₹{totalSpent}</h2>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-green-500 to-green-700 p-5 shadow-xl">
                <p className="text-xs opacity-70">Budget</p>
                <h2 className="mt-2 text-3xl font-black">₹{budget}</h2>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-pink-700 p-5 shadow-xl">
                <p className="text-xs opacity-70">Remaining</p>
                <h2 className="mt-2 text-3xl font-black">₹{remaining}</h2>
              </div>
            </div>

            <div className={`rounded-3xl border p-6 shadow-xl ${darkMode ? 'border-slate-800 bg-slate-900/70' : 'border-gray-200 bg-white'}`}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Analytics</h2>
                <div className="rounded-2xl bg-violet-500/10 px-3 py-1 text-xs text-violet-400">LIVE</div>
              </div>

              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="flex justify-center">
                  <div className="relative">
                    <div
                      className="rounded-full shadow-[0_0_60px_rgba(168,85,247,0.35)]"
                      style={{ width: '240px', height: '240px', background: `conic-gradient(${gradient})` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`flex h-28 w-28 flex-col items-center justify-center rounded-full ${darkMode ? 'bg-[#070B14]' : 'bg-white'}`}>
                        <p className="text-xs text-slate-400">Total</p>
                        <h2 className="text-xl font-black">₹{totalSpent}</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {categoryTotals.map((item, index) => {
                    const percentage = totalSpent > 0
                      ? ((item.total / totalSpent) * 100).toFixed(1)
                      : 0;
                    return (
                      <div key={item.category} className={`rounded-2xl border p-4 ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-gray-200 bg-gray-100'}`}>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full" style={{ background: colors[index % colors.length] }} />
                            <div>
                              <h3 className="text-sm font-semibold capitalize">{item.category}</h3>
                              <p className="text-xs text-slate-400">₹{item.total}</p>
                            </div>
                          </div>
                          <h2 className="text-lg font-black">{percentage}%</h2>
                        </div>
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                          <div className="h-2.5 rounded-full" style={{ width: `${percentage}%`, background: colors[index % colors.length] }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={`rounded-3xl border p-6 shadow-xl ${darkMode ? 'border-slate-800 bg-slate-900/70' : 'border-gray-200 bg-white'}`}>
              <h2 className="mb-5 text-2xl font-bold">Expense History</h2>
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div key={expense.id} className={`flex items-center justify-between rounded-2xl border p-4 ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-gray-200 bg-gray-100'}`}>
                    <div>
                      <h3 className="text-sm font-semibold capitalize">{expense.category}</h3>
                      <p className="mt-1 text-xs text-slate-400">{expense.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-black text-pink-400">₹{expense.amount}</h2>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="rounded-xl bg-red-500 px-3 py-1.5 text-xs font-semibold hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}