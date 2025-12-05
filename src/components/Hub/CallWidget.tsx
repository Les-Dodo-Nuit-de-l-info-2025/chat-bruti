import { Phone } from 'lucide-react';
import './CallWidget.css';
import CallPage from '../../pages/CallPage';

export function CallWidget({ startConversation }: { startConversation: () => void }) {
  
  return (
  <>
    <div className="call-widget">
      <div className="widget-header">
        <h2 className="widget-title">Prêt(e) à perdre votre temps ?</h2>
        <p className="widget-subtitle">Cliquez pour commencer l'aventure inutile</p>
      </div>
      
      <button 
        onClick={startConversation}
        className="start-button"
      >
        <Phone className="button-icon" />
        Démarrer une conversation
      </button>
     
    </div>
    
  </>
);
}