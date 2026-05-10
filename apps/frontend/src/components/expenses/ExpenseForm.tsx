'use client';

import { useState } from 'react';

const API =
  'https://xrf0pgy3g7.execute-api.ap-south-1.amazonaws.com/expenses';

export default function ExpenseForm({
  setExpenses,
}: any) {
  const [amount, setAmount] =
    useState('');

  const [category, setCategory] =
    useState('Food');

  const [date, setDate] =
    useState('');

  const [description, setDescription] =
    useState('');

  const addExpense = async () => {
    try {
      const response = await fetch(API, {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          amount: Number(amount),
          category,
          date,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(
          'Failed to add expense'
        );
      }

      const data =
        await response.json();

      setExpenses((prev: any) => [
        ...prev,
        data,
      ]);

      alert('Expense added ✅');

      setAmount('');
      setCategory('Food');
      setDate('');
      setDescription('');
    } catch (error) {
      alert('Failed to add expense');
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="mb-5 text-2xl font-bold text-white">
        Add Expense
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
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
          className="w-full rounded-xl bg-violet-600 p-3 font-semibold text-white"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}