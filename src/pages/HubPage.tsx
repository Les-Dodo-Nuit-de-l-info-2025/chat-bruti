import { CallWidget } from '../components/Hub/CallWidget';
import { TimeWasted } from '../components/Hub/TimeWasted';
import { ReviewsCarousel } from '../components/Hub/ReviewsCarousel';
import './HubPage.css';
import { Header } from '../components/Hub/Header';

export default function App({ startConversation }: { startConversation: () => void }) {
  return (
    <div className="app-container">
      {/* Header */}
            <Header/>
      {/* Main Container */}
      <div className="app-main-container">

        
        {/* Grid Layout - 60/40 split */}
        <div className="app-grid">
          
          {/* LEFT SECTION - 60% */}
          <div className="app-left-section">
            <div className="app-section-spacing">
              
              {/* Main Slogan */}
              <div className="app-slogan-container">
                <h1 className="app-main-title">
                  Pourquoi résoudre vos problèmes quand on peut en créer de nouveaux ?
                </h1>
                <p className="app-subtitle">
                  L'assistance qui répond à tout... sauf à vos questions
                </p>
              </div>
              
              {/* User Reviews - Style Amazon */}
              <div className="app-reviews-section">
                <h2 className="app-reviews-title">Ce que disent nos (ir)responsables utilisateurs</h2>
                <ReviewsCarousel />
              </div>
            </div>
          </div>
          
          {/* RIGHT SECTION - 40% */}
          <div className="app-right-section">
            <CallWidget 
              startConversation={startConversation}
            />
          </div>
        </div>
        
        {/* FOOTER */}
        <footer className="app-footer">
          <div className="app-footer-content">
            
            <div className="app-footer-links">
              <a href="#" className="app-footer-link">À propos de l'inutilité</a>
              <a href="#" className="app-footer-link">Conditions absurdes</a>
              <a href="#" className="app-footer-link">Contact (ne répondra pas)</a>
            </div>
            
            <div className="app-footer-disclaimer">
              Non responsable de vos attentes déçues
            </div>
            
            <TimeWasted />
          </div>
        </footer>
      </div>
    </div>
  );
}