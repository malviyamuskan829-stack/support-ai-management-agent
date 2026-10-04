import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Ticket, TicketFilterTab, TicketPriority, TicketStatus, TicketMessage } from '../types/ticket';
import { mockTickets } from '../mock/ticketsData';

interface TicketContextType {
  tickets: Ticket[];
  selectedTicket: Ticket | undefined;
  selectedTicketId: string;
  setSelectedTicketId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterTab: TicketFilterTab;
  setFilterTab: (tab: TicketFilterTab) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  filteredTickets: Ticket[];
  isAiAnalyzing: boolean;
  activeDetailView: 'split' | 'investigation_focus' | 'thread_focus';
  setActiveDetailView: (view: 'split' | 'investigation_focus' | 'thread_focus') => void;
  draftInComposer: string;
  setDraftInComposer: (draft: string) => void;
  reanalyzeTicket: (ticketId: string) => void;
  executeAction: (ticketId: string, actionId: string) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  updateTicketPriority: (ticketId: string, priority: TicketPriority) => void;
  addMessage: (ticketId: string, content: string, isInternalNote?: boolean) => void;
  toastNotification: string | null;
  clearToast: () => void;
  aiError: string | null;
  clearAiError: () => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string>(mockTickets[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTab, setFilterTab] = useState<TicketFilterTab>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [activeDetailView, setActiveDetailView] = useState<'split' | 'investigation_focus' | 'thread_focus'>('split');
  const [draftInComposer, setDraftInComposer] = useState<string>('');
  const [toastNotification, setToastNotification] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification(null);
    }, 4500);
  }, []);

  const clearToast = useCallback(() => setToastNotification(null), []);
  const clearAiError = useCallback(() => setAiError(null), []);
  const analyzedTicketsRef = React.useRef<Set<string>>(new Set());

  const selectedTicket = useMemo(() => {
    return tickets.find((t) => t.id === selectedTicketId) || tickets[0];
  }, [tickets, selectedTicketId]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Tab filter
      if (filterTab === 'assigned_to_me' && ticket.assignedAgent?.id !== 'agent-1') return false;
      if (filterTab === 'urgent' && ticket.priority !== 'urgent') return false;
      if (filterTab === 'escalated' && ticket.status !== 'escalated') return false;
      if (filterTab === 'sla_risk' && ticket.slaMinutesRemaining > 30) return false;
      if (filterTab === 'resolved' && ticket.status !== 'resolved') return false;
      if (filterTab === 'all' && ticket.status === 'resolved') {
        // default show active unless explicitly searching or resolved tab
      }

      // Priority filter
      if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) return false;

      // Category filter
      if (categoryFilter !== 'all' && ticket.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSubject = ticket.subject.toLowerCase().includes(query);
        const matchesNumber = ticket.ticketNumber.toLowerCase().includes(query);
        const matchesCustomer = ticket.customer.name.toLowerCase().includes(query) || ticket.customer.company.toLowerCase().includes(query);
        const matchesTags = ticket.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesSummary = ticket.aiInvestigation.issueSummary.toLowerCase().includes(query);
        return matchesSubject || matchesNumber || matchesCustomer || matchesTags || matchesSummary;
      }

      return true;
    });
  }, [tickets, filterTab, priorityFilter, categoryFilter, searchQuery]);

  const updateTicketStatus = useCallback((ticketId: string, newStatus: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t))
    );
    showToast(`Ticket status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
  }, [showToast]);

  const updateTicketPriority = useCallback((ticketId: string, newPriority: TicketPriority) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, priority: newPriority, updatedAt: new Date().toISOString() } : t))
    );
    showToast(`Priority changed to ${newPriority.toUpperCase()}`);
  }, [showToast]);

  const addMessage = useCallback((ticketId: string, content: string, isInternalNote = false) => {
    const newMessage: TicketMessage = {
      id: `msg-${Date.now()}`,
      senderType: 'agent',
      senderName: 'Alex Rivera (You)',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      content,
      isInternalNote,
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            messages: [...t.messages, newMessage],
            updatedAt: new Date().toISOString(),
            status: isInternalNote ? t.status : 'waiting_on_customer',
          };
        }
        return t;
      })
    );

    showToast(isInternalNote ? 'Internal note added' : 'Public response sent to customer');
    setDraftInComposer('');
  }, [showToast]);

  const executeAction = useCallback((ticketId: string, actionId: string) => {
    let actionName = 'Action';
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const updatedActions = t.aiInvestigation.suggestedActions.map((act) => {
            if (act.id === actionId) {
              actionName = act.title;
              return { ...act, executed: true };
            }
            return act;
          });
          return {
            ...t,
            aiInvestigation: {
              ...t.aiInvestigation,
              suggestedActions: updatedActions,
            },
          };
        }
        return t;
      })
    );
    showToast(`✓ Successfully executed: "${actionName}"`);
  }, [showToast]);

  const analyzeTicketWithBackend = useCallback(async (ticketId: string, force = false) => {
    if (!ticketId) return;
    if (!force && analyzedTicketsRef.current.has(ticketId)) return;

    const targetTicket = tickets.find((t) => t.id === ticketId);
    if (!targetTicket) return;

    setIsAiAnalyzing(true);
    setAiError(null);
    showToast(`🤖 AI Co-Pilot analyzing ${targetTicket.ticketNumber} via OpenRouter...`);

    try {
      const res = await fetch('http://localhost:4000/api/ai/investigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetTicket),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `AI Backend HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.aiInvestigation) {
        analyzedTicketsRef.current.add(ticketId);
        setTickets((prev) =>
          prev.map((t) => (t.id === ticketId ? { ...t, aiInvestigation: data.aiInvestigation } : t))
        );
        showToast(`✓ Live AI Investigation complete for ${targetTicket.ticketNumber}`);
      }
    } catch (err: any) {
      console.warn('Backend AI analysis error:', err.message);
      setAiError(err.message || 'AI service temporarily unavailable');
      showToast(`⚠️ AI Service: ${err.message || 'Could not connect to AI backend'}`);
    } finally {
      setIsAiAnalyzing(false);
    }
  }, [tickets, showToast]);

  const handleSelectTicket = useCallback((id: string) => {
    setSelectedTicketId(id);
    analyzeTicketWithBackend(id, false);
  }, [analyzeTicketWithBackend]);

  const reanalyzeTicket = useCallback((ticketId: string) => {
    analyzeTicketWithBackend(ticketId, true);
  }, [analyzeTicketWithBackend]);

  React.useEffect(() => {
    if (selectedTicketId && !analyzedTicketsRef.current.has(selectedTicketId)) {
      analyzeTicketWithBackend(selectedTicketId, false);
    }
  }, []);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        selectedTicket,
        selectedTicketId,
        setSelectedTicketId: handleSelectTicket,
        searchQuery,
        setSearchQuery,
        filterTab,
        setFilterTab,
        priorityFilter,
        setPriorityFilter,
        categoryFilter,
        setCategoryFilter,
        filteredTickets,
        isAiAnalyzing,
        activeDetailView,
        setActiveDetailView,
        draftInComposer,
        setDraftInComposer,
        reanalyzeTicket,
        executeAction,
        updateTicketStatus,
        updateTicketPriority,
        addMessage,
        toastNotification,
        clearToast,
        aiError,
        clearAiError,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
