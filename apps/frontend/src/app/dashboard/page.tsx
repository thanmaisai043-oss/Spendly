'use client';

import {
  useEffect,
  useState,
} from 'react';

export default function DashboardPage() {
  const [expenses, setExpenses] =
    useState<any[]>([]);

  const [amount, setAmount] =
    useState('');

  const [category, setCategory] =
    useState('');

  const [date, setDate] =
    useState('');

  const [budget, setBudget] =
    useState(0);

  const [userEmail, setUserEmail] =
    useState('');

  useEffect(() => {
    const user =
      JSON.parse(
        localStorage.getItem(
          'user'
        ) || '{}'
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
          JSON.parse(
            savedExpenses
          )
        );
      }

      if (savedBudget) {
        setBudget(
          Number(savedBudget)
        );
      }
    }
  }, []);

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
    if (
      !amount ||
      !category ||
      !date
    ) {
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

    setExpenses(
      updatedExpenses
    );

    localStorage.setItem(
      `expenses_${userEmail}`,
      JSON.stringify(
        updatedExpenses
      )
    );

    setAmount('');

    setCategory('');

    setDate('');
  };

  const totalSpent =
    expenses.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          Spendly
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem(
              'user'
            );

            window.location.reload();
          }}
          className="bg-red-500 px-4 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      <div className="mt-8">
        <label className="block mb-2 text-xl">
          Monthly Budget
        </label>

        <input
          type="number"
          value={budget}
          onChange={(e) =>
            setBudget(
              Number(
                e.target.value
              )
            )
          }
          className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-purple-700 p-6 rounded-2xl">
          <h2>Total Spent</h2>

          <p className="text-3xl font-bold">
            ₹{totalSpent}
          </p>
        </div>

        <div className="bg-green-700 p-6 rounded-2xl">
          <h2>Budget</h2>

          <p className="text-3xl font-bold">
            ₹{budget}
          </p>
        </div>

        <div className="bg-pink-700 p-6 rounded-2xl">
          <h2>Remaining</h2>

          <p className="text-3xl font-bold">
            ₹
            {budget -
              totalSpent}
          </p>
        </div>
      </div>

      <div className="mt-10 bg-gray-950 p-6 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6">
          Add Expense
        </h2>

        <div className="grid gap-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="p-4 rounded-xl bg-black border border-gray-700"
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
            className="p-4 rounded-xl bg-black border border-gray-700"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="p-4 rounded-xl bg-black border border-gray-700"
          />

          <button
            onClick={addExpense}
            className="bg-purple-600 p-4 rounded-xl"
          >
            Add Expense
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">
          Expenses
        </h2>

        <div className="grid gap-4">
          {expenses.map(
            (expense) => (
              <div
                key={
                  expense.id
                }
                className="bg-gray-900 p-4 rounded-xl flex justify-between"
              >
                <div>
                  <p>
                    {
                      expense.category
                    }
                  </p>

                  <p className="text-sm text-gray-400">
                    {
                      expense.date
                    }
                  </p>
                </div>

                <p>
                  ₹
                  {
                    expense.amount
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-10 bg-gray-950 p-6 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6">
          Expense Distribution
        </h2>

        <div className="space-y-4">
          {[
            ...new Set(
              expenses.map(
                (e) =>
                  e.category
              )
            ),
          ].map((category) => {
            const total =
              expenses
                .filter(
                  (e) =>
                    e.category ===
                    category
                )
                .reduce(
                  (
                    acc,
                    e
                  ) =>
                    acc +
                    e.amount,
                  0
                );

            const percentage =
              totalSpent > 0
                ? (
                    (total /
                      totalSpent) *
                    100
                  ).toFixed(1)
                : 0;

            return (
              <div
                key={category}
              >
                <div className="flex justify-between mb-1">
                  <span>
                    {category}
                  </span>

                  <span>
                    {
                      percentage
                    }
                    %
                  </span>
                </div>

                <div className="w-full bg-gray-800 rounded-full h-5">
                  <div
                    className="bg-purple-600 h-5 rounded-full"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}