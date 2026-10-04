# REST API Reference

The backend runs on `http://localhost:4000` by default.

---

## 1. Health Check

### `GET /health`
Returns the operational health and server status.

#### Response `200 OK`
```json
{
  "status": "ok",
  "service": "support-ai-management-agent-backend",
  "version": "1.0.0",
  "timestamp": "2026-10-04T14:45:00.000Z"
}
```

---

## 2. AI Autonomous Investigation

### `POST /api/ai/investigate`
Analyzes a support ticket using OpenRouter LLM, verifies the root cause, and generates structured remediation actions and draft replies.

#### Request Body
```json
{
  "id": "t-1042",
  "ticketNumber": "TICK-1042",
  "subject": "Double Payment: ₹1,499 deducted twice for Order #ORD-88214",
  "category": "Billing & Checkout",
  "priority": "urgent",
  "customer": {
    "name": "Priya Sharma",
    "company": "Mumbai, Maharashtra"
  },
  "messages": [
    {
      "senderType": "customer",
      "senderName": "Priya Sharma",
      "content": "₹1,499 was deducted twice from my HDFC account for order #ORD-88214."
    }
  ]
}
```

#### Response `200 OK`
```json
{
  "issueSummary": "Priya Sharma's HDFC bank account was debited ₹1,499 twice for Order #ORD-88214 due to checkout double submission.",
  "rootCauseAnalysis": "Two separate captures were executed within 14 seconds due to page refresh before idempotency confirmation. Only one order was generated.",
  "category": "Billing & Checkout",
  "priority": "urgent",
  "confidenceScore": 96,
  "sentiment": {
    "level": "urgent",
    "score": 90,
    "summary": "Customer is anxious regarding the extra debit and requires fast reversal.",
    "drivers": ["₹1,499 duplicate debit", "Waiting for refund confirmation"]
  },
  "extractedEntities": [
    { "label": "Order Number", "value": "ORD-88214", "type": "system" },
    { "label": "Refund Amount", "value": "₹1,499", "type": "billing" }
  ],
  "suggestedActions": [
    {
      "id": "act-1",
      "title": "Initiate Refund of ₹1,499",
      "description": "Trigger gateway API reversal to return duplicate payment.",
      "type": "refund",
      "impact": "low"
    }
  ],
  "draftCustomerReply": {
    "greeting": "Hi Priya,",
    "tone": "Empathetic & Technical",
    "body": "Thank you for reaching out. We verified that an extra ₹1,499 was debited for Order #ORD-88214...",
    "keyPointsCovered": ["Verified duplicate charge", "Initiated refund of ₹1,499"]
  },
  "aiInvestigation": {
    "status": "ready",
    "analyzedAt": "Just now (Live OpenRouter AI)",
    "confidenceScore": 96,
    "rootCauseAnalysis": "...",
    "draftReply": { "..." : "..." }
  }
}
```

#### Error Responses
- `400 Bad Request`: Missing or invalid ticket payload.
- `401 Unauthorized`: `OPENROUTER_API_KEY` is missing or unconfigured.
- `422 Unprocessable Entity`: AI model response failed schema validation.
- `504 Gateway Timeout`: OpenRouter inference call exceeded timeout.

---

## 3. Knowledge Base Search

### `POST /api/kb/search`
Searches internal SOP runbooks and policy guidelines.

#### Request Body
```json
{
  "category": "Billing",
  "keywords": "refund"
}
```

#### Response `200 OK`
```json
[
  {
    "id": "kb-001",
    "title": "SOP: Instant Refunds for Double Debits & Failed Orders",
    "category": "Billing Policy",
    "relevanceScore": 98,
    "snippet": "When customer confirms double payment for one order, verify gateway capture logs...",
    "source": "Internal Runbook"
  }
]
```

---

## 4. Orders & Payments Lookup

### `GET /api/orders/:id`
Retrieves mock order details and tracking status.

### `GET /api/payments/:id`
Retrieves payment status and refund eligibility.
