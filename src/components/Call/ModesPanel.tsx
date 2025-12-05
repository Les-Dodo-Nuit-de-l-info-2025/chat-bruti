import { ModeCard } from './ModeCard';
import { Trophy } from 'lucide-react';
import './ModesPanel.css';

interface Mode {
  id: string;
  emoji: string;
  label: string;
}

interface ModesPanelProps {
  modes: Mode[];
  activeMode: string;
  onModeChange: (modeId: string) => void;
  suggestedQuestions: string[];
  onQuestionClick: (question: string) => void;
}

export function ModesPanel({ modes, activeMode, onModeChange, suggestedQuestions, onQuestionClick }: ModesPanelProps) {
  return (
    <div className="modes-panel-container">
      {/* Modes Section */}
      <div className="modes-panel-section">
        <div className="modes-panel-section-title">Personnalité active</div>
        <div className="modes-panel-modes-list">
          {modes.map((mode) => (
            <ModeCard
              key={mode.id}
              emoji={mode.emoji}
              label={mode.label}
              isActive={activeMode === mode.id}
              onClick={() => onModeChange(mode.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Divider */}
      <div className="modes-panel-divider" />
      
      {/* Suggested Questions */}
      <div className="modes-panel-section">
        <div className="modes-panel-section-title">💡 Questions inutiles suggérées</div>
        <div className="modes-panel-questions-wrapper">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => onQuestionClick(question)}
              className="modes-panel-question-button"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      
      {/* Fun Stats */}
      <div className="modes-panel-stats">
        <div className="modes-panel-stats-header">
          <Trophy className="modes-panel-trophy-icon" />
          <span className="modes-panel-stats-title">Réponse la plus absurde du jour :</span>
        </div>
        <blockquote className="modes-panel-stats-quote">
          "La pizza est un cercle qui représente l'infini de nos choix de garniture"
        </blockquote>
        <cite className="modes-panel-stats-cite">— Dr. Philoso-Rien</cite>
      </div>
    </div>
  );
}