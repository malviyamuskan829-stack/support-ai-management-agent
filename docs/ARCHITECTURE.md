# System Architecture & Technical Design

The **Support AI Ticket Management Agent** is an enterprise-grade AI co-pilot designed to streamline support ticket resolution through autonomous root-cause investigation, real-time knowledge matching, and 1-click remediation.

---

## 🏛️ High-Level System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND CLIENT (React 18)                      │
│                                                                        │
│   ┌─────────────────────┐  ┌──────────────────┐  ┌─────────────────┐   │
│   │   Sidebar & Queue   │  │   Conversation   │  │ AI Investigation│   │
│   │     Management      │  │     Thread       │  │     Co-Pilot    │   │
│   └──────────┬──────────┘  └────────┬─────────┘  └────────┬────────┘   │
│              │                      │                     │            │
│              └──────────────────────┼─────────────────────┘            │
│                                     │                                  │
│                        ┌────────────▼───────────┐                      │
│                        │     TicketContext      │                      │
│                        │ (Reactive State & HMR) │                      │
│                        └────────────┬───────────┘                      │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      │ HTTP / REST (Fetch API)
                                      ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        BACKEND SERVICE (Node.js)                       │
│                                                                        │
│                        ┌────────────────────────┐                      │
│                        │      HTTP Router       │                      │
│                        │   (routes/router.ts)   │                      │
│                        └────────────┬───────────┘                      │
│                                     │                                  │
│                 ┌───────────────────┴───────────────────┐              │
│                 ▼                                       ▼              │
│   ┌───────────────────────────┐           ┌────────────────────────┐   │
│   │  InvestigationController  │           │   Health / Orders / KB │   │
│   └─────────────┬─────────────┘           └────────────────────────┘   │
│                 ▼                                                      │
│   ┌───────────────────────────┐                                        │
│   │   InvestigationService    │                                        │
│   └──────┬─────────────┬──────┘                                        │
│          │             │                                               │
│          ▼             ▼                                               │
│   ┌─────────────┐┌──────────────┐                                      │
│   │OpenRouter AI││Ajv Validator │                                      │
│   │ (ai/client) ││(schema.json) │                                      │
│   └──────┬──────┘└──────────────┘                                      │
└──────────┼─────────────────────────────────────────────────────────────┘
           │ HTTPS (Bearer Auth)
           ▼
┌────────────────────────────────────────────────────────────────────────┐
│              OpenRouter LLM Inference Gateway (Llama 3.3 70B)          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Autonomous AI Investigation Sequence

```text
User / Agent                   Frontend (TicketContext)            Backend Controller / AI Engine
     │                                    │                                      │
     │ 1. Select Ticket / Click Rescan    │                                      │
     │───────────────────────────────────>│                                      │
     │                                    │ 2. Set isAiAnalyzing = true          │
     │                                    │    Display loading spinner           │
     │                                    │                                      │
     │                                    │ 3. POST /api/ai/investigate          │
     │                                    │─────────────────────────────────────>│
     │                                    │                                      │ 4. Build prompt with Indian
     │                                    │                                      │    context & INR amounts
     │                                    │                                      │ 5. Call OpenRouter LLM API
     │                                    │                                      │ 6. Parse JSON output
     │                                    │                                      │ 7. Validate with Ajv Schema
     │                                    │                                      │
     │                                    │ 8. Return structured report          │
     │                                    │<─────────────────────────────────────│
     │                                    │                                      │
     │                                    │ 9. Update TicketContext state        │
     │                                    │    Populate AI Root Cause, Actions,  │
     │                                    │    Draft Reply & Telemetry logs      │
     │ 10. Review & Click 1-Click Action  │                                      │
     │<───────────────────────────────────│                                      │
```

---

## 📂 Backend Modular Design

The backend is organized into standard separation of concerns:
- **`controllers/`**: Handles HTTP request parsing, input validation, and sending responses.
- **`routes/`**: Route dispatching matching URL and HTTP verbs.
- **`services/`**: Core business logic (orchestrating AI investigation, querying mock orders and knowledge bases).
- **`models/`**: TypeScript interfaces and types for tickets, customers, telemetry, and actions.
- **`middleware/`**: CORS header policies and streaming JSON body parsing.
- **`ai/`**: OpenRouter LLM client, model routing, system prompt engineering, and timeout handling.
- **`utils/`**: JSON schema definition, Ajv validation, custom error classes.
- **`tests/`**: Automated integration tests verifying endpoints and response formats.

---

## 🔒 Security Best Practices
- **No Client-Side Secrets**: API keys are isolated strictly on the backend.
- **Input Sanitization**: Streaming body parser enforces a 10MB maximum request ceiling.
- **Environment Isolation**: `.env` is excluded via `.gitignore` with `.env.example` templates provided.
- **Structured Output Validation**: Every LLM response is checked against strict JSON Schema before sending to the client.
