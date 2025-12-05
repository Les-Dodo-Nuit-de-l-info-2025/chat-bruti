import { useState } from 'react';
import { Mic, Send } from 'lucide-react';
import { motion } from 'motion/react';
import './InputBar.css';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  onVoiceToggle: (isRecording: boolean) => void;
  isRecording: boolean;
}

export function InputBar({ onSendMessage, onVoiceToggle, isRecording }: InputBarProps) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleMicPress = () => {
    onVoiceToggle(!isRecording);
  };
  
  return (
    <div className="input-bar-container">
      {/* Text Input */}
      <form onSubmit={handleSubmit} className="input-bar-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez votre message ou activez le micro..."
          className="input-bar-text-input"
        />
        
        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim()}
          className="input-bar-send-button"
        >
          <span>Envoyer</span>
          <Send className="input-bar-send-icon" />
        </button>
      </form>
    </div>
  );
}