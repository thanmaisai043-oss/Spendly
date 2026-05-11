'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#6366f1',
  '#22c55e',
  '#ec4899',
  '#f59e0b',
  '#06b6d4',
];

export default function ExpenseCharts({
  expenses,
}: {
  expenses: any[];
}) {
  const data = expenses.map(
    (expense) => ({
      name: expense.category,
      value: Number(expense.amount),
    })
  );

  return (
    <div className="rounded-2xl bg-slate-900 p-5">
      <h2 className="mb-5 text-xl font-bold text-white">
        Expense Analytics
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}