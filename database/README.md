# Database Setup & Documentation

This directory contains the relational database definition and seed data for the **Support AI Ticket Management Agent**.

---

## 📁 Files
- **`schema.sql`**: Full Data Definition Language (DDL) creating tables for `customers`, `orders`, `payments`, `tickets`, `ticket_messages`, `ai_investigation_reports`, `suggested_actions`, and `knowledge_articles`.
- **`seeds.sql`**: Seed data with realistic Indian e-commerce support scenarios (Double payment, UPI failure, Refund delay, Wrong item, Delivery delay, Promo code discount).

---

## 🗄️ Relational Entity-Relationship Overview

```text
  ┌──────────────┐          ┌──────────────┐
  │  Customers   │◄─────────┤    Orders    │
  └──────┬───────┘          └──────┬───────┘
         │                         │
         │                         ▼
         │                  ┌──────────────┐
         ├─────────────────►│   Payments   │
         │                  └──────────────┘
         ▼
  ┌──────────────┐          ┌───────────────────────────┐
  │   Tickets    │◄─────────┤ AI Investigation Reports  │
  └──────┬───────┘          └──────────────┬────────────┘
         │                                 │
         ▼                                 ▼
  ┌──────────────┐                  ┌───────────────────────────┐
  │TicketMessages│                  │     Suggested Actions     │
  └──────────────┘                  └───────────────────────────┘
```

---

## 🚀 How to Run / Import

### Option 1: SQLite (Quick Local Testing)
```bash
# In database/ directory
sqlite3 support_ai.db < schema.sql
sqlite3 support_ai.db < seeds.sql
```

### Option 2: PostgreSQL
```bash
# Create database
createdb support_ai_db

# Run schema and seeds
psql -d support_ai_db -f schema.sql
psql -d support_ai_db -f seeds.sql
```

### Option 3: MySQL
```bash
mysql -u root -p -e "CREATE DATABASE support_ai_db;"
mysql -u root -p support_ai_db < schema.sql
mysql -u root -p support_ai_db < seeds.sql
```
