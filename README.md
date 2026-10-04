# Support AI Ticket Management Agent 🚀

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff.svg)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38b2ac.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade autonomous AI customer support copilot and ticket management dashboard. Built for high-volume customer operations, it investigates customer tickets, identifies root causes using simulated telemetry and company logs, retrieves relevant runbooks/SOPs, crafts empathetic replies with Indian Rupee (₹) amounts, and recommends 1-click remediation actions.

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Architecture & Workflow](#-architecture--workflow)
- [Repository Structure](#-repository-structure)
- [Technology Stack](#-technology-stack)
- [Setup & Run Instructions](#-setup--run-instructions)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Testing & Verification](#-testing--verification)
- [License](#-license)

---

## 🎯 Project Overview

Customer support teams spend enormous manual effort reading complex tickets, cross-checking order states, searching internal runbooks, drafting repetitive emails, and navigating disparate admin panels to perform remediation.

The **Support AI Ticket Management Agent** solves this by embedding an autonomous AI investigator directly beside the support ticket queue.

### Core Value Proposition
1. **Zero-Lag Root Cause Isolation**: Diagnoses the exact failure condition (e.g., gateway timeout, double charge, warehouse bin picking mix-up, courier weather delay).
2. **Context & SOP Matching**: Semantically matches standard operating procedures and past resolved incident tickets.
3. **Draft Customer Replies**: Generates empathetic, context-aware responses with bank reference numbers, timelines, and resolution steps in INR (₹).
4. **1-Click Remediation Actions**: Provides pre-structured action buttons (*“Initiate Instant Refund of ₹1,499”*, *“Book Doorstep Exchange”*, *“Auto-Create Order from UPI”*) with safety impact indicators.

---

## ✨ Key Features

- **Autonomous AI Co-Pilot**: Powered by OpenRouter (`meta-llama/llama-3.3-70b-instruct`) with Ajv JSON Schema validation.
- **Realistic Indian E-Commerce Cases**:
  - Double Payment (₹1,499 duplicate deduction on HDFC Bank).
  - UPI Payment Deducted but Order Failed (Google Pay / SBI).
  - Return Pickup Completed but Refund Delayed (7-day warehouse inspection backlog).
  - Wrong Item Delivered (Color variant mismatch with Doorstep Hand-to-Hand Exchange).
  - Delivery Delayed (Lucknow weather delay with live driver contact details).
  - Promotional Coupon Dropped (Cart checkout refresh with ₹500 instant refund).
- **Multi-Queue Support Desk**: *All Active*, *Assigned to Me*, *Urgent Priority*, *Escalated*, *High SLA Risk (<30m)*, and *Resolved Archive*.
- **Live SLA Timers**: Visual warning indicators and real-time urgency metrics.
- **Enterprise View Modes**: Balanced Split View, AI Investigation Focus View, and Thread Focus View.

---

## 🏛️ Architecture & Workflow

```text
Customer Ticket Selected
          │
          ▼
Frontend Client (React 18 + Vite)
          │  POST /api/ai/investigate
          ▼
Backend API Server (Node.js)
          │  Prompt Engineering & Model Routing
          ▼
OpenRouter LLM Inference (Llama 3.3 70B)
          │  Structured JSON Output
          ▼
Ajv Schema Validation (validateAiResult)
          │  Root Cause, Telemetry, Suggested Actions, Draft Reply
          ▼
Dashboard Displays AI Co-Pilot Findings
          │
          ▼
Support Agent Reviews & Executes 1-Click Action
```

For detailed component interaction diagrams and specifications, see **[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)** and **[`docs/API.md`](docs/API.md)**.

---

## 📂 Repository Structure

```text
support-ai-management-agent/
├── frontend/                  # React 18 + Vite + Tailwind CSS dashboard
│   ├── src/
│   │   ├── components/        # Layout, Common, Ticket List & Detail components
│   │   ├── context/           # Reactive TicketContext with real AI flow
│   │   ├── mock/              # Indian customer support sample tickets
│   │   ├── types/             # Strict TypeScript models
│   │   ├── utils/             # Formatters, SLA badges & styling helpers
│   │   ├── App.tsx            # Main application shell
│   │   └── main.tsx           # Entrypoint
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/                   # Node.js + TypeScript API server
│   ├── src/
│   │   ├── ai/                # OpenRouter client & system prompts
│   │   ├── controllers/       # Investigation, Health, Orders & KB controllers
│   │   ├── routes/            # Request router
│   │   ├── services/          # Investigation, Knowledge, & Order services
│   │   ├── models/            # Shared data contracts
│   │   ├── middleware/        # CORS & body parser
│   │   ├── utils/             # Ajv validation & custom error classes
│   │   ├── tests/             # Backend integration test suite
│   │   └── index.ts           # Server bootstrap
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .gitignore
├── database/                  # Relational schema and seed data
│   ├── schema.sql             # Relational DDL (PostgreSQL, SQLite, MySQL)
│   ├── seeds.sql              # Realistic seed data for Indian support tickets
│   └── README.md              # Database setup & import guide
├── docs/                      # Documentation
│   ├── ARCHITECTURE.md        # Technical architecture & sequence diagrams
│   └── API.md                 # REST API endpoints reference
├── .env.example               # Root environment template
├── .gitignore                 # Root version control ignore rules
└── README.md                  # This file
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Lucide React, Vite |
| **Backend** | Node.js, TypeScript, HTTP, Ajv JSON Schema Validator |
| **AI / LLM** | OpenRouter API (`meta-llama/llama-3.3-70b-instruct`) with JSON Schema validation |
| **Database** | Relational SQL Schema & Seeds (PostgreSQL, SQLite, MySQL compatible) |
| **Tooling** | npm, ts-node-dev, PostCSS, Autoprefixer |

---

## 🚀 Setup & Run Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **OpenRouter API Key**: Obtain from [openrouter.ai](https://openrouter.ai/)

---

### 2. Configure Environment Variables
Copy `.env.example` in `backend/`:

```bash
cd backend
cp .env.example .env
```

Set your OpenRouter API key in `backend/.env`:
```env
PORT=4000
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct
```

> ⚠️ **Security Warning**: Never commit your real `.env` file or API key to version control.

---

### 3. Run Backend Server

```bash
cd backend

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start server (runs on http://localhost:4000)
npm run start

# Or development mode with auto-reload:
npm run dev
```

Verify backend health:
```bash
curl http://localhost:4000/health
# Output: {"status":"ok","service":"support-ai-management-agent-backend",...}
```

---

### 4. Run Frontend Dashboard

In a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server (runs on http://localhost:5173)
npm run dev

# Or build for production:
npm run build
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🗄️ Database Setup

The database definitions are located in `database/`:
- **`database/schema.sql`**: Table creation for tickets, customers, orders, payments, messages, and AI reports.
- **`database/seeds.sql`**: Seed data matching all demo scenarios.

To import into SQLite:
```bash
cd database
sqlite3 support_ai.db < schema.sql
sqlite3 support_ai.db < seeds.sql
```

For PostgreSQL or MySQL instructions, refer to **[`database/README.md`](database/README.md)**.

---

## 🧪 Testing & Verification

### Run Backend Integration Tests
```bash
cd backend
npm run test
```
Verifies health check, input validation, and knowledge base search endpoints.

### Frontend Type-Check & Build
```bash
cd frontend
npm run build
```
Executes `tsc && vite build` ensuring 100% type safety and production bundling.

---

## 📄 License
This project is licensed under the MIT License.
