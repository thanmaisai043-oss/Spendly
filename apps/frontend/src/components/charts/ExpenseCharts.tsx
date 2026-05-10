'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';

const data = [
  {
    name: 'Food',
    value: 1200,
  },
  {
    name: 'Travel',
    value: 3500,
  },
  {
    name: 'Shopping',
    value: 2200,
  },
  {
    name: 'Bills',
    value: 1800,
  },
];

const COLORS = [
  '#8B5CF6',
  '#06B6D4',
  '#F59E0B',
  '#10B981',
];

export default function ExpenseCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* PIE CHART */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Categories
            </h2>

            <p className="text-xs text-slate-400">
              Expense distribution
            </p>
          </div>

          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[10px] text-violet-300">
            Pie
          </span>
        </div>

        <div className="h-[220px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={3}
                label={{
                  fontSize: 10,
                  fill: '#CBD5E1',
                }}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR CHART */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Monthly Spend
            </h2>

            <p className="text-xs text-slate-400">
              Expense analytics
            </p>
          </div>

          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] text-cyan-300">
            Graph
          </span>
        </div>

        <div className="h-[220px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1E293B"
              />

              <XAxis
                dataKey="name"
                stroke="#94A3B8"
                fontSize={10}
              />

              <YAxis
                stroke="#94A3B8"
                fontSize={10}
              />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                fill="#8B5CF6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}