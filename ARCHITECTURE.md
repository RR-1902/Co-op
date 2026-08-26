# Cooperative Marketplace - Architecture

This document describes the architecture of the Cooperative-Owned Digital Service Marketplace prototype.

## Tech Stack
- **Frontend Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database / Backend as a Service**: Supabase (PostgreSQL, Auth, Storage)

## Project Structure
```text
cooperative-marketplace/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Reusable UI components
│   │   ├── common/    # Buttons, inputs, modals
│   │   └── layout/    # Navbar, Sidebar, Footer
│   ├── features/      # Feature-specific components
│   ├── pages/         # Route components (Dashboard, Home, etc.)
│   ├── services/      # Supabase client and API calls
│   ├── types/         # TypeScript interfaces and types
│   ├── utils/         # Helper functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Entry point
├── public/            # Public assets
├── supabase/          # Supabase SQL migrations and seed data
└── package.json       # Dependencies
```

## Data Model (Supabase PostgreSQL)
- **users**: Core user accounts linked to Supabase Auth.
- **cooperatives**: Details of local cooperatives.
- **applications**: Worker applications pending review.
- **workers**: Verified workers linked to a cooperative.
- **services**: Available service categories (Plumbing, Electrical, etc.).
- **worker_skills**: Junction table for workers and their specific skills.
- **certifications**: Worker certifications.
- **worker_availability**: Time slots and status of workers.
- **locations**: Service areas/zones.
- **bookings**: Service requests by customers.
- **payments**: Simulated payment records.
- **invoices**: Generated invoices for completed jobs.
- **ratings**: Reviews and ratings from customers.
- **welfare_records**: Worker welfare contributions.
- **demand_data**: Historical data for AI forecasting.

## Role-Based Access Control (RBAC)
- **CUSTOMER**: Can browse, book, and rate services.
- **APPLICANT**: Can view their application status.
- **WORKER**: Can manage profile, availability, and bookings.
- **COOPERATIVE_OFFICER**: Can manage applications and workers within their cooperative.
- **FEDERATION_ADMIN**: Global read access to platform-wide statistics.
