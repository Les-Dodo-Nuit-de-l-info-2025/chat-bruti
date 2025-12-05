import { Phone, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import './Header.css';

interface HeaderProps {
  callDuration: string;
  absurdityLevel: number;
  relevanceLevel: number;
}

export function Header({ callDuration, absurdityLevel, relevanceLevel }: HeaderProps) {
  return (
    <div className="header-container">
      {/* Left - Online Status */}
      <div className="header-left">
        <div className="header-online-status">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Phone className="header-phone-icon" />
          </motion.div>
          <span className="header-online-text">Chat'bruti</span>
        </div>
        
        <div className="header-time-wasted">
          <span className="header-time-label">Temps gaspillé :</span>
          <span className="header-time-value">
            {callDuration}
          </span>
        </div>
      </div>
      
      
    </div>
  );
}