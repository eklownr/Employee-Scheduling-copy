# Employee Scheduling API – Getting Started

$\color{orange}{\large\text{Backend school project}}$

### This project uses these tools:

node.js - express - rest api - typescript - zod - JWT - bcrypt - prisma orm - postgres - insomnia - react - vite - logging winston - prettier - eslint - 599 modules in backend - 406 muduler in frontend.

```
.
├── backend
│   ├── SQL scripts
│   ├── generated
│   │   └── prisma
│   │       ├── internal
│   │       └── models
│   ├── logs
│   ├── middleware
│   │   └── auth
│   ├── prisma
│   │   └── migrations
│   │       ├── 20260407093610_instiall_migration
│   │       ├── 20260408100547_instiall_migration2
│   │       └── 20260416214740_replace_date_with_dayofweek
│   ├── scripts
│   └── types
└── frontend
    └── employee-scheduling
        ├── public
        └── src
            ├── components
            ├── constants
            ├── hooks
            ├── pages
            ├── services
            ├── types
            └── utils
```

$\color{orange}{\large\text{Follow these steps to set up the project localy.}}$

## 1. Setup Express Server and Prisma Postgres DataBase

```bash
git clone https://github.com/eklownr/Employee-Scheduling-copy
cd Employee-Scheduling-copy/backend
pnpm i # install modules. use 'npm' if it feels right

# Ensure '.env' exists in the backend. Set: DATABASE_URL and JWT_SECRET
# edit .env and add your private string to connect to Prisma.io
DATABASE_URL="postgresql://user:password@localhost:5432/employeescheduling"
JWT_SECRET="asdfoiu34ifki < secret code > vq34f+u2kfoekfkfg3k0f"

# Set up postgres database with prisma ORM:
pnpm prisma migrate dev --name init # Apply Database Migrations
pnpm seed                           # add data to the database
pnpm prisma generate                # Prisma client

# Start express server
pnpm dev
pnpm prisma studio                  # Optional: View data in Prisma Studio
```

## 2. Setup Frontend

```bash
cd ../frontend/employee-scheduling/
pnpm i   # install modules
pnpm dev # running vite
```
