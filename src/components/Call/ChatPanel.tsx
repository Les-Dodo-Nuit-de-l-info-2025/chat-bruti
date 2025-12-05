import { useEffect, useRef } from 'react';
import { BubbleChat } from './BubbleChat';
import { Camera } from 'lucide-react';
import './ChatPanel.css';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatPanelProps {
  messages: Message[];
  botAvatar: string;
  isTyping: boolean;
  botName?: string;
}

export function ChatPanel({ messages, botAvatar, isTyping, botName }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleExportChat = () => {
    const exportData = {
      botName: botName || 'Assistant',
      exportDate: new Date().toISOString(),
      totalMessages: messages.length,
      messages: messages.map(msg => ({
        id: msg.id,
        text: msg.text,
        sender: msg.isBot ? botName || 'Assistant' : 'Utilisateur',
        isBot: msg.isBot,
        timestamp: msg.timestamp,
      }))
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conversation_${botName || 'assistant'}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="chat-panel-container">
      {/* Header */}
      <div className="chat-panel-header">
        <button className="chat-panel-capture-button" onClick={handleExportChat}>
          <Camera className="chat-panel-capture-icon" />
          Capturer ce moment
        </button>
      </div>
      
      {/* Messages */}
      <div ref={scrollRef} className="chat-panel-messages">
        {messages.map((message, index) => (
          <div key={message.id} className="chat-panel-message-wrapper">
            
            
            <BubbleChat
              message={message.text}
              isBot={message.isBot}
              botAvatar={message.isBot ? botAvatar : undefined}
            />
          </div>
        ))}
        
        {/* System Notifications */}
        {messages.length > 5 && messages.length % 5 === 0 && (
          <div className="chat-panel-notification">
            <span className="chat-panel-notification-badge">
              ⚠️ Détection d'une réponse presque cohérente
            </span>
          </div>
        )}
        
        {isTyping && (
          <div className="chat-panel-typing">
            <img src={botAvatar} alt="Bot" className="chat-panel-typing-avatar" />
            <div className="chat-panel-typing-bubble">
              <span className="chat-panel-typing-text">
                {botName} est en train de formuler une réponse (probablement hors-sujet)...
              </span>
              <span className="chat-panel-typing-dots">
                <span className="chat-panel-typing-dot">.</span>
                <span className="chat-panel-typing-dot">.</span>
                <span className="chat-panel-typing-dot">.</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}