import { useState, useEffect } from 'react';
import { Header } from '../components/Call/Header';
import { BotProfile } from '../components/Call/BotProfile';
import { ChatPanel } from '../components/Call/ChatPanel';
import { InputBar } from '../components/Call/InputBar';
import './CallPage.css';
import { useInterlocuteur } from '../contexts/InterlocuteurContext';
import { Interlocuteur } from '../ai/Context';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

export default function CallPage() {
  const { interlocuteur, setInterlocuteur } = useInterlocuteur();
  const [callDuration, setCallDuration] = useState('00:00');
  const [absurdityLevel, setAbsurdityLevel] = useState(0);
  const [relevanceLevel] = useState(3);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [notification, setNotification] = useState<{ message: string; variant: 'warning' | 'success' | 'info' } | null>(null);

  const [activeMode, setActiveMode] = useState('philosophe');

  const [messages, setMessages] = useState<Message[]>([]);

  const modes = [
    { id: 'philosophe', emoji: '🧙', label: 'Philosophe raté' },
    { id: 'poete', emoji: '📝', label: 'Poète du dimanche' },
    { id: 'expert', emoji: '🎓', label: 'Expert en rien' },
    { id: 'aleatoire', emoji: '🎲', label: 'Aléatoire total' },
  ];

  const suggestedQuestions = [
    "Pourquoi le ciel est bleu ?",
    "Quel est le sens de la vie ?",
    "Comment faire une omelette ?",
    "Qui a inventé les chaussettes ?",
  ];

  // Récupérer les informations du personnage
  const personnageInfo = interlocuteur?.obtenirInfosPersonnage();

  // Update call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => {
        const [min, sec] = prev.split(':').map(Number);
        const totalSec = min * 60 + sec + 1;
        const newMin = Math.floor(totalSec / 60);
        const newSec = totalSec % 60;
        return `${String(newMin).padStart(2, '0')}:${String(newSec).padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!interlocuteur) {
      console.error('Aucun interlocuteur disponible');
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);

    // Envoyer le message à l'interlocuteur et obtenir la réponse
    setIsTyping(true);
    try {
      const response = await interlocuteur.envoyerMessage(text);

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      // Increase absurdity level
      setAbsurdityLevel((prev) => Math.min(100, prev + Math.floor(Math.random() * 5) + 1));

      // Random notification
      if (Math.random() > 0.7) {
        setNotification({
          message: '⚠️ Détection d\'une réponse presque cohérente',
          variant: 'warning',
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setIsTyping(false);
      setNotification({
        message: '❌ Erreur lors de la communication avec l\'assistant',
        variant: 'warning',
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleModeChange = (modeId: string) => {
    setActiveMode(modeId);
    const modeNames: Record<string, string> = {
      philosophe: 'Philosophe raté',
      poete: 'Poète du dimanche',
      expert: 'Expert en rien',
      aleatoire: 'Aléatoire total',
    };
    setNotification({
      message: `Mode ${modeNames[modeId]} activé`,
      variant: 'success',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleHangUp = () => {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir abandonner cette conversation passionnante ?'
    );
    if (confirmed) {
      alert('Conversation terminée ! Merci d\'avoir gaspillé votre temps avec nous 🎉');
    }
  };

  const handleChangeAssistant = () => {
    // Créer un nouvel interlocuteur aléatoire
    const nouvelInterlocuteur = new Interlocuteur();
    setInterlocuteur(nouvelInterlocuteur);

    // Réinitialiser l'historique de conversation
    setMessages([]);

    // Réinitialiser le niveau d'absurdité
    setAbsurdityLevel(0);

    setNotification({
      message: '🔄 Nouvel assistant connecté... Bon courage !',
      variant: 'info',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="call-page-container">
      {/* Header */}
      <Header
        callDuration={callDuration}
        absurdityLevel={absurdityLevel}
        relevanceLevel={relevanceLevel}
      />

      {/* Main Content */}
      <div className="call-page-main">
        {/* Left Column - Bot Profile */}
        <div className="call-page-left-column">
          <BotProfile
            avatarUrl={personnageInfo?.photo || "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=400&fit=crop"}
            name={personnageInfo?.nom || "Assistant"}
            title={personnageInfo?.introduction || "Assistant téléphonique"}
            mood="En ligne"
            moodEmoji="📞"
            onChangeAssistant={handleChangeAssistant}
          />
        </div>

        {/* Center Column - Chat & Input */}
        <div className="call-page-center-column">
          <ChatPanel
            messages={messages}
            botAvatar={personnageInfo?.photo || "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=400&fit=crop"}
            isTyping={isTyping}
            botName={personnageInfo?.nom}
          />
          
          <InputBar
            onSendMessage={handleSendMessage}
            onVoiceToggle={setIsRecording}
            isRecording={isRecording}
          />
        </div>
      </div>
    </div>
  );
}