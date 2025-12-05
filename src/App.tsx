import Call from './pages/CallPage'
import Hub from './pages/HubPage'
import { useState } from 'react'
import { InterlocuteurProvider } from './contexts/InterlocuteurContext'
import { Interlocuteur } from './ai/Context'
import { useInterlocuteur } from './contexts/InterlocuteurContext'

function AppContent() {
  const [isCalling, setIsCalling] = useState(false);
  const { setInterlocuteur } = useInterlocuteur();

  const startConversation = () => {
    // Créer un nouveau personnage aléatoire au démarrage de la conversation
    const nouvelInterlocuteur = new Interlocuteur();
    setInterlocuteur(nouvelInterlocuteur);
    setIsCalling(true);
  };

  return (
    <div>
      {
        !isCalling ?
          <Hub
            startConversation={startConversation}
          />
        :
          <Call/>
      }
    </div>
  );
}

export default function App() {
  return (
    <InterlocuteurProvider>
      <AppContent />
    </InterlocuteurProvider>
  );
}