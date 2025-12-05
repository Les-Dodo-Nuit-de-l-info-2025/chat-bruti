import './ModeCard.css';

interface ModeCardProps {
  emoji: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function ModeCard({ emoji, label, isActive, onClick }: ModeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`mode-card-button ${isActive ? 'active' : 'inactive'}`}
    >
      <span className="mode-card-emoji">{emoji}</span>
      <span className="mode-card-label">{label}</span>
    </button>
  );
}