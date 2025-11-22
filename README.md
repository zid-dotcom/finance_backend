# Raynott Finance Backend

This is a full-featured backend scaffold for Raynott Fintech with finance functionality: accounts, transactions, budgets, insights and auth.

## Quick start
1. Copy `.env.example` to `.env` and update `MONGO_URI` and `JWT_SECRET`.
2. `npm install`
3. `npm run seed` to create demo data (optional)
4. `npm run dev` to start in dev mode

Demo user: demo@raynott.com / Password123!

## Endpoints (high-level)
- `POST /api/auth/register` - register
- `POST /api/auth/login` - login
- `GET /api/auth/me` - get current user
- `GET /api/accounts` - list accounts
- `POST /api/accounts` - create account
- `GET /api/accounts/:id` - get account + recent transactions
- `POST /api/transactions` - create transaction
- `GET /api/transactions` - list transactions (query: page, from, to, category)
- `POST /api/budgets` - create budget
- `GET /api/budgets` - list budgets
- `GET /api/budgets/:id/progress` - get budget progress
- `GET /api/insights/monthly-category` - category breakdown
- `GET /api/insights/summary` - income vs expense

