# Employee Scheduling API – Getting Started

Follow these steps to set up the project locally.

## 1. Setup Express Server and Prisma Postgres DataBase

```bash
git clone https://github.com/eklownr/Employee-Scheduling-copy.git
cd Employee-Scheduling-copy/backend
pnpm install

# edit .env and add your private string to connect to Prisma.io
DATABASE_URL="postgresql://user:password@localhost:5432/employeescheduling"

pnpm prisma migrate dev --name init #  Apply Database Migrations
pnpm prisma generate   # Prisma client
pnpm seed # add data to the database
pnpm dev  # Start dev server
pnpm prisma studio   # Optional: View data in Prisma Studio
```

## 2. Setup Frontend

```bash
cd ../frontend
pnpm i   # install modules
pnpm dev # running vite
```
