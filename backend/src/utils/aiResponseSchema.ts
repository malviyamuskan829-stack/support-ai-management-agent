// JSON Schema for AI investigation response
export const aiResponseSchema = {
  type: "object",
  properties: {
    issueSummary: { type: "string" },
    rootCauseAnalysis: { type: "string" },
    category: { type: "string" },
    priority: { type: "string" },
    confidenceScore: { type: "number" },
    suggestedNextStep: { type: "string" },
    sentiment: {
      type: "object",
      properties: {
        level: { type: "string" },
        score: { type: "number" },
        summary: { type: "string" },
        drivers: { type: "array", items: { type: "string" } }
      }
    },
    extractedEntities: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          value: { type: "string" },
          type: { type: "string" }
        },
        required: ["label", "value"]
      }
    },
    investigationLogs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          source: { type: "string" },
          status: { type: "string" },
          timestamp: { type: "string" },
          title: { type: "string" },
          details: { type: "string" }
        },
        required: ["title", "details"]
      }
    },
    matchedKnowledge: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          category: { type: "string" },
          relevanceScore: { type: "number" },
          snippet: { type: "string" },
          source: { type: "string" }
        },
        required: ["title", "snippet"]
      }
    },
    suggestedActions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          type: { type: "string" },
          impact: { type: "string" }
        },
        required: ["title", "description"]
      }
    },
    draftCustomerReply: {
      type: "object",
      properties: {
        greeting: { type: "string" },
        tone: { type: "string" },
        subject: { type: "string" },
        body: { type: "string" },
        keyPointsCovered: { type: "array", items: { type: "string" } }
      },
      required: ["body"]
    }
  },
  required: [
    "issueSummary",
    "rootCauseAnalysis",
    "draftCustomerReply",
    "confidenceScore"
  ],
  additionalProperties: true
};
