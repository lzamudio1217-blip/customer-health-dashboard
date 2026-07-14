import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  DollarSign,
  MessageSquare,
  Ticket,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CustomerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params;

  const customerId = Number(id);

  if (Number.isNaN(customerId)) {
    notFound();
  }

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      activities: {
        orderBy: {
          date: "desc",
        },
      },
      notes: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!customer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8 text-slate-900">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Customer Account
              </p>
              <h1 className="mt-2 text-4xl font-bold">{customer.name}</h1>
              <p className="mt-2 text-slate-600">
                {customer.industry} • {customer.plan} Plan
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyles(
                customer.healthStatus
              )}`}
            >
              {customer.healthStatus}
            </span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Health Score</p>
                <Activity className="h-5 w-5 text-slate-500" />
              </div>
              <p className="mt-3 text-3xl font-bold">
                {customer.healthScore}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Monthly Revenue</p>
                <DollarSign className="h-5 w-5 text-slate-500" />
              </div>
              <p className="mt-3 text-3xl font-bold">
                ${customer.monthlyRevenue.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Support Tickets</p>
                <Ticket className="h-5 w-5 text-slate-500" />
              </div>
              <p className="mt-3 text-3xl font-bold">
                {customer.supportTickets}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Last Active</p>
                <CalendarDays className="h-5 w-5 text-slate-500" />
              </div>
              <p className="mt-3 text-lg font-bold">
                {formatDate(customer.lastActiveDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-bold">Health Score Breakdown</h2>
              <p className="text-sm text-slate-500">
                Factors used to evaluate customer account health.
              </p>
            </div>

            <div className="space-y-4">
              <ScoreRow label="Usage Score" value={customer.usageScore} />
              <ScoreRow
                label="Engagement Score"
                value={customer.engagementScore}
              />
              <ScoreRow
                label="Support Load"
                value={Math.max(0, 100 - customer.supportTickets * 8)}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-bold">Notes</h2>
              <p className="text-sm text-slate-500">
                Customer success notes and follow-up context.
              </p>
            </div>

            <div className="space-y-3">
              {customer.notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                    <MessageSquare className="h-4 w-4" />
                    {formatDate(note.createdAt)}
                  </div>
                  <p className="text-sm text-slate-700">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <p className="text-sm text-slate-500">
              Latest customer events and product interactions.
            </p>
          </div>

          <div className="space-y-3">
            {customer.activities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col gap-1 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-slate-500">
                    Type: {activity.type}
                  </p>
                </div>
                <p className="text-sm text-slate-500">
                  {formatDate(activity.date)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-slate-500">{value}/100</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}