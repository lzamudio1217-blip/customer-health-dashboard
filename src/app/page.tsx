import { Activity, AlertTriangle, DollarSign, Users } from "lucide-react";

const customers = [
  {
    name: "Northstar Athletics",
    plan: "Pro",
    revenue: 2400,
    healthScore: 92,
    status: "Healthy",
    lastActive: "2026-06-28",
    supportTickets: 1,
  },
  {
    name: "Bay Area Soccer Club",
    plan: "Growth",
    revenue: 1200,
    healthScore: 74,
    status: "Warning",
    lastActive: "2026-06-22",
    supportTickets: 4,
  },
  {
    name: "Summit Volleyball",
    plan: "Starter",
    revenue: 650,
    healthScore: 43,
    status: "At Risk",
    lastActive: "2026-06-10",
    supportTickets: 9,
  },
  {
    name: "Pacific Tennis Academy",
    plan: "Pro",
    revenue: 3100,
    healthScore: 88,
    status: "Healthy",
    lastActive: "2026-06-27",
    supportTickets: 2,
  },
];

function getStatusStyles(status: string) {
  if (status === "Healthy") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Warning") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-red-100 text-red-700";
}

export default function Home() {
  const totalCustomers = customers.length;
  const healthyCustomers = customers.filter(
    (customer) => customer.status === "Healthy"
  ).length;
  const atRiskCustomers = customers.filter(
    (customer) => customer.status === "At Risk"
  ).length;
  const monthlyRevenue = customers.reduce(
    (total, customer) => total + customer.revenue,
    0
  );

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

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Total Customers</p>
              <Users className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-4 text-3xl font-bold">{totalCustomers}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Healthy Customers</p>
              <Activity className="h-5 w-5 text-slate-500" />
            </div>
            <p className="mt-4 text-3xl font-bold">{healthyCustomers}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">At-Risk Customers</p>
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
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Customer Accounts</h2>
              <p className="text-sm text-slate-500">
                Demo customer data used to calculate health status.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Customer</th>
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
                  <tr key={customer.name} className="border-t border-slate-200">
                    <td className="px-4 py-4 font-medium">{customer.name}</td>
                    <td className="px-4 py-4">{customer.plan}</td>
                    <td className="px-4 py-4">
                      ${customer.revenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">{customer.healthScore}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                          customer.status
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">{customer.lastActive}</td>
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