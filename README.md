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
