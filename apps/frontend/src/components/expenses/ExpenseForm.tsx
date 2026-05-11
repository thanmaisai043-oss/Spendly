'use client';

import { useState } from 'react';

export default function ExpenseForm({
  setExpenses,
}: any) {
  const [amount, setAmount] =
    useState('');

  const [category, setCategory] =
    useState('');

  const [description, setDescription] =
    useState('');

  const addExpense = () => {
    if (
      amount === '' ||
      category === '' ||
      description === ''
    ) {
      alert('Fill all fields');
      return;
    }

    const newExpense = {
      id: Date.now(),

      amount: Number(amount),

      category,

      description,

      date:
        new Date().toLocaleString(),
    };

    setExpenses(
      (prev: any[]) => [
        ...prev,
        newExpense,
      ]
    );

    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="rounded-2xl bg-slate-900 p-5">
      <h2 className="mb-5 text-2xl font-bold text-white">
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
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
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
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        <button
          onClick={addExpense}
          className="w-full rounded-xl bg-indigo-600 p-3 font-semibold text-white"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}