import { createContext, useContext, useState, ReactNode } from 'react';
import { Interlocuteur } from '../ai/Context';

interface InterlocuteurContextType {
  interlocuteur: Interlocuteur | null;
  setInterlocuteur: (interlocuteur: Interlocuteur | null) => void;
}

const InterlocuteurContext = createContext<InterlocuteurContextType | undefined>(undefined);

export function InterlocuteurProvider({ children }: { children: ReactNode }) {
  const [interlocuteur, setInterlocuteur] = useState<Interlocuteur | null>(null);

  return (
    <InterlocuteurContext.Provider value={{ interlocuteur, setInterlocuteur }}>
      {children}
    </InterlocuteurContext.Provider>
  );
}

export function useInterlocuteur() {
  const context = useContext(InterlocuteurContext);
  if (context === undefined) {
    throw new Error('useInterlocuteur must be used within an InterlocuteurProvider');
  }
  return context;
}
