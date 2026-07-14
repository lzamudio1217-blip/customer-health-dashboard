# Customer Health Dashboard

A full-stack customer analytics dashboard built to track customer activity, revenue, support tickets, and account health scores. The app helps identify healthy, warning, and at-risk customer accounts using a database-backed dashboard with charts, filters, and customer detail pages.

## Live Demo

https://customer-health-dashboard-azure.vercel.app/

## Features

- Dashboard overview with total customers, healthy accounts, at-risk accounts, monthly revenue, and average health score
- Customer health scoring system using usage, engagement, support ticket load, and revenue signals
- Customer account table sorted by lowest health score
- Search and filter functionality for customer accounts
- Health status categories: Healthy, Warning, and At Risk
- Interactive dashboard charts for customer health breakdown and revenue
- Clickable customer detail pages with account metrics, notes, and recent activity
- PostgreSQL database integration using Prisma ORM
- Seeded demo data for realistic customer success workflows
- Deployed with Vercel

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Prisma
- PostgreSQL
- Recharts
- Lucide React
- Vercel

## Health Score Logic

Each customer is assigned a health score from 0 to 100 based on multiple account signals:

- Usage score
- Engagement score
- Support ticket volume
- Monthly revenue

Health status is assigned using the following ranges:

```text
80-100 = Healthy
50-79 = Warning
0-49 = At Risk
```

## Database Models

The app uses three main database models:

```text
Customer
Activity
Note
```

Customers have related activities and notes, allowing each account detail page to show recent product interactions and customer success context.

## Local Setup

Clone the repository:

```bash
git clone https://github.com/lzamudio1217-blip/customer-health-dashboard.git
cd customer-health-dashboard
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your_postgres_database_url"
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Project Purpose

This project was built as a portfolio application to demonstrate full-stack software engineering, database modeling, dashboard development, customer analytics, and deployment skills. It is inspired by real customer success and internal analytics workflows.

## Future Improvements

- Add authentication
- Add customer creation and editing
- Add CSV import/export
- Add advanced filtering by plan, industry, and revenue
- Add automated tests
- Add role-based access control
