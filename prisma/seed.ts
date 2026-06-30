import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CustomerSeed = {
  name: string;
  industry: string;
  plan: string;
  monthlyRevenue: number;
  lastActiveDate: Date;
  usageScore: number;
  engagementScore: number;
  supportTickets: number;
};

function calculateHealthScore(customer: CustomerSeed) {
  const supportScore = Math.max(0, 100 - customer.supportTickets * 8);

  let revenueScore = 40;

  if (customer.monthlyRevenue >= 3000) {
    revenueScore = 100;
  } else if (customer.monthlyRevenue >= 2000) {
    revenueScore = 85;
  } else if (customer.monthlyRevenue >= 1000) {
    revenueScore = 70;
  } else if (customer.monthlyRevenue >= 500) {
    revenueScore = 55;
  }

  return Math.round(
    customer.usageScore * 0.4 +
      customer.engagementScore * 0.3 +
      supportScore * 0.2 +
      revenueScore * 0.1
  );
}

function getHealthStatus(score: number) {
  if (score >= 80) {
    return "Healthy";
  }

  if (score >= 50) {
    return "Warning";
  }

  return "At Risk";
}

async function main() {
  await prisma.note.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.customer.deleteMany();

  const customers: CustomerSeed[] = [
    {
      name: "Northstar Athletics",
      industry: "Sports Club",
      plan: "Pro",
      monthlyRevenue: 2400,
      lastActiveDate: new Date("2026-06-28"),
      usageScore: 94,
      engagementScore: 88,
      supportTickets: 1,
    },
    {
      name: "Bay Area Soccer Club",
      industry: "Youth Sports",
      plan: "Growth",
      monthlyRevenue: 1200,
      lastActiveDate: new Date("2026-06-22"),
      usageScore: 76,
      engagementScore: 70,
      supportTickets: 4,
    },
    {
      name: "Summit Volleyball",
      industry: "Sports Academy",
      plan: "Starter",
      monthlyRevenue: 650,
      lastActiveDate: new Date("2026-06-10"),
      usageScore: 42,
      engagementScore: 48,
      supportTickets: 9,
    },
    {
      name: "Pacific Tennis Academy",
      industry: "Tennis Academy",
      plan: "Pro",
      monthlyRevenue: 3100,
      lastActiveDate: new Date("2026-06-27"),
      usageScore: 90,
      engagementScore: 86,
      supportTickets: 2,
    },
    {
      name: "Evergreen Swim Club",
      industry: "Aquatics",
      plan: "Growth",
      monthlyRevenue: 1800,
      lastActiveDate: new Date("2026-06-24"),
      usageScore: 81,
      engagementScore: 77,
      supportTickets: 3,
    },
    {
      name: "Redwood Running Group",
      industry: "Fitness",
      plan: "Starter",
      monthlyRevenue: 500,
      lastActiveDate: new Date("2026-06-12"),
      usageScore: 39,
      engagementScore: 45,
      supportTickets: 7,
    },
    {
      name: "Golden State Lacrosse",
      industry: "Youth Sports",
      plan: "Pro",
      monthlyRevenue: 2750,
      lastActiveDate: new Date("2026-06-26"),
      usageScore: 85,
      engagementScore: 84,
      supportTickets: 2,
    },
    {
      name: "Valley Basketball League",
      industry: "Sports League",
      plan: "Growth",
      monthlyRevenue: 1500,
      lastActiveDate: new Date("2026-06-18"),
      usageScore: 61,
      engagementScore: 58,
      supportTickets: 6,
    },
  ];

  for (const customer of customers) {
    const healthScore = calculateHealthScore(customer);
    const healthStatus = getHealthStatus(healthScore);

    await prisma.customer.create({
      data: {
        ...customer,
        healthScore,
        healthStatus,
        activities: {
          create: [
            {
              type: "login",
              description: `${customer.name} logged into the platform.`,
              date: customer.lastActiveDate,
            },
            {
              type: "report_view",
              description: `${customer.name} viewed their monthly performance report.`,
              date: new Date("2026-06-20"),
            },
          ],
        },
        notes: {
          create: [
            {
              content: `${customer.name} is currently marked as ${healthStatus}. Follow up based on engagement and support activity.`,
            },
          ],
        },
      },
    });
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });