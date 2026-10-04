import React from 'react';
import { TicketProvider } from './context/TicketContext';
import { AppLayout } from './components/layout/AppLayout';

export const App: React.FC = () => {
  return (
    <TicketProvider>
      <AppLayout />
    </TicketProvider>
  );
};

export default App;
