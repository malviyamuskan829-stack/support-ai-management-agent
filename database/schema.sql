-- ====================================================================
-- Database Schema: Support AI Ticket Management Agent
-- Relational model for support tickets, customers, telemetry, & AI logs
-- Supported Engines: PostgreSQL / SQLite / MySQL
-- ====================================================================

-- 1. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    avatar_url VARCHAR(255),
    company_city VARCHAR(100),
    tier VARCHAR(20) DEFAULT 'growth', -- 'enterprise', 'growth', 'starter'
    arr_spent VARCHAR(50),             -- e.g. '₹18,500 Total Spent'
    region VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'IST (UTC+5:30)',
    tenure VARCHAR(50),
    health_score INT DEFAULT 85,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    order_id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) REFERENCES customers(id),
    status VARCHAR(50) NOT NULL,        -- 'processing', 'delivered', 'failed', 'confirmed'
    item_name VARCHAR(150),
    amount_inr DECIMAL(10, 2) NOT NULL,
    carrier VARCHAR(50),                -- 'BlueDart', 'Delhivery'
    tracking_url VARCHAR(255),
    expected_delivery TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    transaction_id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(order_id),
    customer_id VARCHAR(50) REFERENCES customers(id),
    amount_inr DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),         -- 'UPI', 'HDFC Net Banking', 'Credit Card'
    status VARCHAR(50) NOT NULL,        -- 'captured', 'failed', 'refunded'
    is_duplicate BOOLEAN DEFAULT FALSE,
    refund_eligible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tickets Table
CREATE TABLE IF NOT EXISTS tickets (
    id VARCHAR(50) PRIMARY KEY,
    ticket_number VARCHAR(50) NOT NULL UNIQUE,
    subject VARCHAR(255) NOT NULL,
    customer_id VARCHAR(50) REFERENCES customers(id),
    status VARCHAR(30) DEFAULT 'open',   -- 'open', 'in_progress', 'waiting_on_customer', 'escalated', 'resolved'
    priority VARCHAR(20) DEFAULT 'medium', -- 'urgent', 'high', 'medium', 'low'
    channel VARCHAR(30) DEFAULT 'portal', -- 'email', 'portal', 'live_chat', 'api_webhook'
    category VARCHAR(50) NOT NULL,      -- 'Billing & Checkout', 'API & Webhooks', 'Data & Export', etc.
    sla_minutes_remaining INT DEFAULT 60,
    assigned_agent_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Ticket Messages / Conversation Thread
CREATE TABLE IF NOT EXISTS ticket_messages (
    id VARCHAR(50) PRIMARY KEY,
    ticket_id VARCHAR(50) REFERENCES tickets(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL,   -- 'customer', 'agent', 'system'
    sender_name VARCHAR(100) NOT NULL,
    sender_email VARCHAR(150),
    content TEXT NOT NULL,
    is_internal_note BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. AI Autonomous Investigation Reports
CREATE TABLE IF NOT EXISTS ai_investigation_reports (
    id VARCHAR(50) PRIMARY KEY,
    ticket_id VARCHAR(50) REFERENCES tickets(id) ON DELETE CASCADE,
    confidence_score INT DEFAULT 95,
    issue_summary TEXT NOT NULL,
    root_cause_analysis TEXT NOT NULL,
    sentiment_level VARCHAR(30) DEFAULT 'urgent', -- 'urgent', 'frustrated', 'neutral', 'satisfied'
    sentiment_score INT DEFAULT 85,
    draft_reply_greeting VARCHAR(100),
    draft_reply_body TEXT,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Suggested Remediation Actions
CREATE TABLE IF NOT EXISTS suggested_actions (
    id VARCHAR(50) PRIMARY KEY,
    investigation_id VARCHAR(50) REFERENCES ai_investigation_reports(id) ON DELETE CASCADE,
    ticket_id VARCHAR(50) REFERENCES tickets(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    action_type VARCHAR(30) DEFAULT 'execute', -- 'refund', 'execute', 'reply', 'escalate', 'config'
    impact_level VARCHAR(20) DEFAULT 'low',    -- 'low', 'moderate', 'high'
    is_executed BOOLEAN DEFAULT FALSE
);

-- 8. Knowledge Base & SOP Articles
CREATE TABLE IF NOT EXISTS knowledge_articles (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    snippet TEXT NOT NULL,
    source_type VARCHAR(50) DEFAULT 'Internal Runbook',
    url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_customer ON tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
