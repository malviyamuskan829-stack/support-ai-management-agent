# Support AI Ticket Management Agent

An enterprise-ready AI support co-pilot designed to streamline customer support operations by autonomously analyzing incoming tickets, performing root-cause investigation across system telemetry, retrieving relevant SOPs/runbooks, drafting context-aware responses, and recommending 1-click remediation actions.

---

## 📌 Problem Statement
Customer support teams spend enormous amounts of manual effort:
- Reading and understanding fragmented customer complaint tickets.
- Manually looking up customer records, payment statuses, and shipment telemetry across disconnected tools.
- Searching internal documentation and standard operating procedures (SOPs) for the correct resolution policy.
- Typing repetitive, error-prone replies under tight SLA pressure.
- Deciding which remediation steps to take and executing them manually.

---

## 💡 Solution
The **Support AI Ticket Management Agent** acts as an autonomous co-pilot for support engineers:
1. **Instant Root-Cause Investigation**: Reads customer ticket details and performs cross-service telemetry analysis to identify the exact cause (e.g. payment gateway callback delay, warehouse bin mismatch, courier transit delays).
2. **Context & Runbook Retrieval**: Semantically links the issue to internal SOP guidelines and past resolved incidents.
3. **AI Response Drafter**: Generates an empathetic, technically precise customer response in Indian Rupees (INR / ₹) with reference IDs and timelines ready to insert into the composer.
4. **1-Click Suggested Remediation Actions**: Proposes actionable next steps (e.g. *“Initiate Instant Refund of ₹1,499”*, *“Book Doorstep Exchange”*, *“Auto-Create Order from UPI Payment”*) with safety impact levels.
5. **Human-in-the-Loop Decision**: Empowers the support engineer to review AI findings, edit or approve responses, and execute actions with single-click confidence.

---

## 🔄 Main AI Workflow

```text
Customer Ticket Selected
        │
        ▼
AI Investigation (OpenRouter / LLM)
        │
        ▼
Knowledge & Telemetry Context (Runbooks, Gateway Logs, Order State)
        │
        ▼
Suggested Customer Response (Empathetic & Technical in INR)
        │
        ▼
Recommended Next Actions (1-Click Remediation & Escalations)
        │
        ▼
Support Agent Decision & Execution
```

---

## 🛠️ Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React
- **Build Tool**: Vite
- **Backend**: Node.js HTTP Server, TypeScript
- **AI Engine**: OpenRouter API (`meta-llama/llama-3.3-70b-instruct`) with structured JSON mode
- **Schema Validation**: Ajv (JSON Schema validation)
- **Data & State**: Reactive React Context with structured Indian customer support ticket models

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- An OpenRouter API Key ([https://openrouter.ai](https://openrouter.ai))

### 2. Configure Environment Variables
Navigate to the `server/` directory and create `.env` from the provided `.env.example`:

```bash
cd server
cp .env.example .env
```

Open `server/.env` and insert your OpenRouter API key:
```env
PORT=4000
OPENROUTER_API_KEY=your_actual_openrouter_api_key_here
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct
```

> **Security Note**: Never commit your real `.env` file or API keys to version control. Both `.env` and `dist/` are included in `.gitignore`.

---

### 3. Running the Backend Server
From the `server/` folder:

```bash
# Install dependencies (if not already installed)
npm install

# Build the TypeScript backend
npm run build

# Start the server (runs on http://localhost:4000)
npm run start

# Or run in development mode with auto-reload
npm run dev
```

The backend server will start on **`http://localhost:4000`** and expose:
- `GET  /health` - Backend health check
- `POST /api/ai/investigate` - Real OpenRouter AI ticket investigation endpoint

---

### 4. Running the Frontend Dashboard
From the root project directory (`support-ai-management-agent/`):

```bash
# Install dependencies (if not already installed)
npm install

# Start the development server (runs on http://localhost:5173)
npm run dev

# Or build for production
npm run build
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser to view and interact with the Support AI Ticket Management dashboard.

---

## 📦 Demo Indian Customer Support Scenarios Included
The application includes 6 realistic Indian customer support cases for demonstration:
1. **Double Payment (`TICK-1042`)**: Priya Sharma (Mumbai) charged ₹1,499 twice on HDFC Bank for wireless headphones; AI investigates duplicate gateway capture and drafts ₹1,499 refund.
2. **Payment Deducted, Order Failed (`TICK-1041`)**: Rahul Verma (Delhi) debited ₹899 via Google Pay UPI with failed cart; AI reconciles NPCI callback delay and offers 1-click order creation or refund.
3. **Refund Not Received (`TICK-1040`)**: Anjali Patel (Ahmedabad) returned smart watch 7 days ago; AI diagnoses warehouse intake barcode scan delay and releases instant ₹2,499 refund.
4. **Wrong Item Delivered (`TICK-1039`)**: Rohit Kumar (Bhopal) received blue backpack instead of black; AI identifies bin picking error and schedules Doorstep Hand-to-Hand Exchange via BlueDart.
5. **Order Delayed (`TICK-1038`)**: Neha Singh (Lucknow) awaiting event dress; AI checks live courier transit feed, identifies rain delay, and provides live driver contact details.
6. **Coupon Not Applied (`TICK-1037`)**: Arjun Mehta (Pune) entered code `FESTIVE500`; AI identifies session drop during payment switch and issues ₹500 refund.
