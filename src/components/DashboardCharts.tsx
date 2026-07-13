"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StatusData = {
  name: string;
  value: number;
};

type RevenueData = {
  name: string;
  revenue: number;
};

type DashboardChartsProps = {
  statusData: StatusData[];
  revenueData: RevenueData[];
};

export function DashboardCharts({
  statusData,
  revenueData,
}: DashboardChartsProps) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold">Customer Health Breakdown</h2>
          <p className="text-sm text-slate-500">
            Distribution of healthy, warning, and at-risk accounts.
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={95}
                label
              >
                {statusData.map((entry) => (
                  <Cell key={entry.name} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold">Revenue by Customer</h2>
          <p className="text-sm text-slate-500">
            Monthly recurring revenue across customer accounts.
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}