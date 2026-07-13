import { Activity, AlertTriangle, DollarSign, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

function getStatusStyles(status: string) {
  if (status === "Healthy") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Warning") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-red-100 text-red-700";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function Home() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      healthScore: "asc",
    },
  });

  const totalCustomers = customers.length;

  const healthyCustomers = customers.filter(
    (customer) => customer.healthStatus === "Healthy"
  ).length;

  const atRiskCustomers = customers.filter(
    (customer) => customer.healthStatus === "At Risk"
  ).length;

  const monthlyRevenue = customers.reduce(
    (total, customer) => total + customer.monthlyRevenue,
    0
  );

  const averageHealthScore =
    customers.length > 0
      ? Math.round(
          customers.reduce((total, customer) => total + customer.healthScore, 0) /
            customers.length
        )
      : 0;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8 text-slate-900">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Customer Analytics
          </p>
          <h1 className="mt-2 text-4xl font-bold">Customer Health Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Track customer activity, revenue, support tickets, and health scores
            to identify healthy, warning, and at-risk accounts.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Total Customers</p>
              <Users className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-4 text-3xl font-bold">{totalCustomers}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Healthy</p>
              <Activity className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-4 text-3xl font-bold">{healthyCustomers}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">At Risk</p>
              <AlertTriangle className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-4 text-3xl font-bold">{atRiskCustomers}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Monthly Revenue</p>
              <DollarSign className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-4 text-3xl font-bold">
              ${monthlyRevenue.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Avg. Health</p>
              <Activity className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-4 text-3xl font-bold">{averageHealthScore}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Customer Accounts</h2>
              <p className="text-sm text-slate-500">
                Database-backed customer data sorted by lowest health score.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Industry</th>
                  <th className="px-4 py-3 font-medium">Plan</th>
                  <th className="px-4 py-3 font-medium">Revenue</th>
                  <th className="px-4 py-3 font-medium">Health Score</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Last Active</th>
                  <th className="px-4 py-3 font-medium">Tickets</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t border-slate-200">
                    <td className="px-4 py-4 font-medium">{customer.name}</td>
                    <td className="px-4 py-4">{customer.industry}</td>
                    <td className="px-4 py-4">{customer.plan}</td>
                    <td className="px-4 py-4">
                      ${customer.monthlyRevenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">{customer.healthScore}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                          customer.healthStatus
                        )}`}
                      >
                        {customer.healthStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {formatDate(customer.lastActiveDate)}
                    </td>
                    <td className="px-4 py-4">{customer.supportTickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}