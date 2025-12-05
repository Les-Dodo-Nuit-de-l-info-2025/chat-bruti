import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import './BotProfile.css';

interface BotProfileProps {
  avatarUrl: string;
  name: string;
  title: string;
  mood: string;
  moodEmoji: string;
  onChangeAssistant: () => void;
}

export function BotProfile({ avatarUrl, name, title, mood, moodEmoji, onChangeAssistant }: BotProfileProps) {
  console.log(avatarUrl)
  return (
    <div className="bot-profile-container">
      {/* Avatar */}
      <div className="bot-profile-avatar-section">
        <div className="bot-profile-avatar-wrapper">
        
          <ImageWithFallback 
            src={avatarUrl}
            alt={name}
            className="bot-profile-avatar-image"
          />
         
        </div>
        
        {/* Name & Title */}
        <div className="bot-profile-info">
          <div className="bot-profile-name-row">
            {name}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bot-profile-bio">
        <p className="bot-profile-bio-text">
          <div className="bot-profile-title">{title}</div>

        </p>
      </div>
      
      {/* Change Assistant Button */}
      <button
        onClick={onChangeAssistant}
        className="bot-profile-change-button"
      >
        <RefreshCw className="bot-profile-change-button-icon" />
        Tenter un autre incompétent
      </button>
    </div>
  );
}