import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import './BubbleChat.css';

interface Reaction {
  emoji: string;
  label: string;
  count: number;
}

interface BubbleChatProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
  botAvatar?: string;
  reactions?: Reaction[];
  onReact?: (label: string) => void;
}

export function BubbleChat({ message, isBot, timestamp, botAvatar, reactions }: BubbleChatProps) {
  const [hovering, setHovering] = useState(false);
  
  return (
    <div className={`bubble-chat-container ${isBot ? 'align-start' : 'align-end'}`}>
      
      
      <div className={`bubble-chat-content ${isBot ? 'align-start' : 'align-end'}`}>
        <div
          className={`bubble-chat-message ${isBot ? 'bot' : 'user'}`}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {message}
        </div>
        
     
        {timestamp && (
          <span className="bubble-chat-timestamp">{timestamp}</span>
        )}
      </div>
    </div>
  );
}