'use client';

type Expense = {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
};

type Props = {
  expenses: Expense[];
  setExpenses: React.Dispatch<
    React.SetStateAction<Expense[]>
  >;
};

export default function ExpenseList({
  expenses,
  setExpenses,
}: Props) {
  function handleDelete(id: number) {
    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== id)
    );
  }

  function handleEdit(id: number) {
    const newDescription = prompt(
      'Enter new description'
    );

    if (!newDescription) return;

    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              description: newDescription,
            }
          : expense
      )
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Expenses
        </h2>

        <span className="rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-indigo-300">
          {expenses.length} records
        </span>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800 text-left text-slate-400">
            <th className="pb-4">DATE</th>
            <th className="pb-4">CATEGORY</th>
            <th className="pb-4">
              DESCRIPTION
            </th>
            <th className="pb-4">AMOUNT</th>
            <th className="pb-4">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b border-slate-800"
            >
              <td className="py-5">
                {expense.date}
              </td>

              <td className="py-5 text-slate-400">
                {expense.category}
              </td>

              <td className="py-5">
                {expense.description}
              </td>

              <td className="py-5 font-bold text-yellow-400">
                ₹{expense.amount}
              </td>

              <td className="py-5">
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleEdit(expense.id)
                    }
                    className="rounded-lg border border-blue-500 px-4 py-2 text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(expense.id)
                    }
                    className="rounded-lg border border-red-500 px-4 py-2 text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}