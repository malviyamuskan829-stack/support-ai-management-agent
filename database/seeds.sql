-- ====================================================================
-- Database Seed Data: Indian E-Commerce Support Scenarios
-- Support AI Ticket Management Agent Demo Records
-- ====================================================================

-- 1. Insert Customers
INSERT INTO customers (id, name, email, company_city, tier, arr_spent, region, timezone, tenure, health_score) VALUES
('cust-101', 'Priya Sharma', 'priya.sharma@gmail.com', 'Mumbai, Maharashtra', 'enterprise', '₹18,500 Total Spent', 'West India (Mumbai)', 'IST (UTC+5:30)', '1.8 years', 82),
('cust-102', 'Rahul Verma', 'rahul.verma@outlook.com', 'Delhi, NCR', 'growth', '₹12,400 Total Spent', 'North India (Delhi)', 'IST (UTC+5:30)', '1.2 years', 88),
('cust-103', 'Anjali Patel', 'anjali.patel@gmail.com', 'Ahmedabad, Gujarat', 'growth', '₹24,900 Total Spent', 'West India (Ahmedabad)', 'IST (UTC+5:30)', '2.1 years', 76),
('cust-104', 'Rohit Kumar', 'rohit.kumar@gmail.com', 'Bhopal, Madhya Pradesh', 'starter', '₹6,800 Total Spent', 'Central India (Bhopal)', 'IST (UTC+5:30)', '6 months', 91),
('cust-105', 'Neha Singh', 'neha.singh@gmail.com', 'Lucknow, Uttar Pradesh', 'growth', '₹16,200 Total Spent', 'North India (Lucknow)', 'IST (UTC+5:30)', '1.4 years', 84),
('cust-106', 'Arjun Mehta', 'arjun.mehta@gmail.com', 'Pune, Maharashtra', 'enterprise', '₹32,000 Total Spent', 'West India (Pune)', 'IST (UTC+5:30)', '2.6 years', 97);

-- 2. Insert Orders
INSERT INTO orders (order_id, customer_id, status, item_name, amount_inr, carrier, tracking_url) VALUES
('ORD-88214', 'cust-101', 'processing', 'Wireless Bluetooth Headphones (Matte Black)', 1499.00, 'Delhivery', 'https://track.example.com/88214'),
('ORD-88290', 'cust-102', 'confirmed', 'Premium Cotton Casual Shirt (Size M)', 899.00, 'BlueDart', 'https://track.example.com/88290'),
('ORD-77401', 'cust-103', 'delivered', 'Smart Fitness Watch (Rose Gold)', 2499.00, 'Delhivery', 'https://track.example.com/77401'),
('ORD-91024', 'cust-104', 'delivered', 'Voyager 30L Waterproof Laptop Backpack', 1899.00, 'BlueDart', 'https://track.example.com/91024'),
('ORD-93041', 'cust-105', 'processing', 'Embroidered Silk Anarkali Suit', 2199.00, 'Delhivery', 'https://track.example.com/93041'),
('ORD-84910', 'cust-106', 'delivered', 'Smart Home Security Wi-Fi Camera', 2999.00, 'BlueDart', 'https://track.example.com/84910');

-- 3. Insert Payments
INSERT INTO payments (transaction_id, order_id, customer_id, amount_inr, payment_method, status, is_duplicate, refund_eligible) VALUES
('TXN-99810', 'ORD-88214', 'cust-101', 1499.00, 'HDFC Net Banking', 'captured', FALSE, FALSE),
('TXN-99811', 'ORD-88214', 'cust-101', 1499.00, 'HDFC Net Banking', 'captured', TRUE, TRUE),
('TXN-77192', 'ORD-88290', 'cust-102', 899.00, 'Google Pay UPI', 'captured', FALSE, FALSE),
('TXN-66120', 'ORD-77401', 'cust-103', 2499.00, 'Credit Card', 'refunded', FALSE, FALSE),
('TXN-55102', 'ORD-84910', 'cust-106', 500.00, 'UPI Refund', 'refunded', FALSE, FALSE);

-- 4. Insert Tickets
INSERT INTO tickets (id, ticket_number, subject, customer_id, status, priority, channel, category, sla_minutes_remaining, assigned_agent_id) VALUES
('t-1042', 'TICK-1042', 'Double Payment: ₹1,499 deducted twice for Order #ORD-88214', 'cust-101', 'escalated', 'urgent', 'portal', 'Billing & Checkout', 18, 'agent-1'),
('t-1041', 'TICK-1041', '₹899 deducted via UPI but order status shows Payment Failed', 'cust-102', 'open', 'urgent', 'live_chat', 'Billing & Checkout', 25, 'agent-1'),
('t-1040', 'TICK-1040', 'Return pickup completed 7 days ago but ₹2,499 refund not credited', 'cust-103', 'in_progress', 'high', 'email', 'Billing & Checkout', 45, 'agent-1'),
('t-1039', 'TICK-1039', 'Wrong Item Delivered: Ordered Black Laptop Backpack, received Blue Backpack', 'cust-104', 'waiting_on_customer', 'medium', 'portal', 'Data & Export', 120, 'agent-1'),
('t-1038', 'TICK-1038', 'Order #ORD-93041 delayed: Expected delivery was yesterday, still in transit', 'cust-105', 'open', 'medium', 'email', 'API & Webhooks', 90, 'agent-1'),
('t-1037', 'TICK-1037', 'Discount coupon FESTIVE500 entered but ₹500 discount was not applied', 'cust-106', 'resolved', 'low', 'portal', 'Billing & Checkout', 0, 'agent-1');

-- 5. Insert Sample Messages
INSERT INTO ticket_messages (id, ticket_id, sender_type, sender_name, sender_email, content, is_internal_note) VALUES
('msg-1', 't-1042', 'customer', 'Priya Sharma', 'priya.sharma@gmail.com', 'I was buying a wireless headphone set for ₹1,499 today. Due to a page refresh during checkout, the payment was deducted twice from my HDFC Bank account (Transaction IDs: TXN-99810 and TXN-99811). But in my orders section, only one order #ORD-88214 was created. Please verify and refund the extra ₹1,499 immediately.', FALSE),
('msg-2', 't-1042', 'system', 'SLA Guard Engine', NULL, 'Duplicate payment anomaly detected. Ticket escalated to Urgent Priority queue. SLA target: 30 minutes.', FALSE),
('msg-3', 't-1042', 'agent', 'Alex Rivera (You)', NULL, 'Inspected payment gateway logs. Two successful captures of ₹1,499 occurred within 14 seconds for order #ORD-88214. Secondary transaction TXN-99811 is an unlinked duplicate ready for instant refund.', TRUE);

-- 6. Insert Knowledge Base SOPs
INSERT INTO knowledge_articles (id, title, category, snippet, source_type, url) VALUES
('kb-001', 'SOP: Handling Duplicate Debits for Single Orders', 'Billing Policy', 'When customer confirms double payment for one order, verify gateway capture logs. If secondary charge is unlinked, trigger automated refund immediately to original payment source (2-4 business days for netbanking/UPI).', 'Internal Runbook', 'https://support.store.internal/sop/duplicate-payments'),
('kb-002', 'SOP: Reconciling UPI Deducted but Order Failed Scenarios', 'Payment SOP', 'When UPI status is Captured but cart was dropped, agents can either: (1) Reconcile and auto-generate the order with the saved cart, or (2) Trigger an automated refund to the customer UPI VPA (settles within 24-48 hours).', 'Internal Runbook', 'https://support.store.internal/sop/upi-failed-reconciliation'),
('kb-003', 'SOP: Expediting Delayed Returns with Warehouse Intake Bottlenecks', 'Return & Refund Policy', 'If a return package has reached the fulfillment center but QC has taken longer than 48 hours, support agents are authorized to force-approve the refund of up to ₹5,000 immediately.', 'Internal Runbook', 'https://support.store.internal/sop/delayed-refund-release'),
('kb-004', 'SOP: Doorstep Hand-to-Hand Exchange for Mispicked Items', 'Fulfillment SOP', 'For wrong-item deliveries, create a Hand-to-Hand Exchange order. The courier delivers the correct item and collects the wrong item simultaneously at zero extra cost to customer.', 'SOP Guideline', 'https://support.store.internal/sop/doorstep-exchange');
