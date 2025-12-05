import { Phone, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import './Header.css';

export function Header() {
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
        
      </div>
      
      
    </div>
  );
}