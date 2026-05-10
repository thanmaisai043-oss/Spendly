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
  budget: number;
};

export default function AIInsights({
  expenses,
  budget,
}: Props) {
  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remaining = budget - totalSpent;

  const highestExpense = expenses.length
    ? expenses.reduce((max, expense) =>
        expense.amount > max.amount
          ? expense
          : max
      )
    : null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            AI Spending Insights
          </h2>

          <p className="text-sm text-slate-400">
            Smart financial analysis
          </p>
        </div>

        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
          AI
        </span>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Total Spending
          </p>

          <h3 className="mt-1 text-2xl font-bold text-red-400">
            ₹{totalSpent}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">
            Remaining Budget
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-400">
            ₹{remaining}
          </h3>
        </div>

        {highestExpense && (
          <div className="rounded-xl bg-slate-950 p-4">
            <p className="text-sm text-slate-400">
              Highest Expense
            </p>

            <h3 className="mt-1 text-lg font-bold text-yellow-400">
              {highestExpense.category} —
              ₹{highestExpense.amount}
            </h3>
          </div>
        )}

        <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
          <p className="text-sm leading-6 text-slate-300">
            {remaining < 0
              ? '⚠️ You exceeded your monthly budget.'
              : remaining < 3000
              ? '⚠️ Budget is getting low.'
              : '✅ Your spending is under control.'}
          </p>
        </div>
      </div>
    </div>
  );
}