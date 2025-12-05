import { Star } from 'lucide-react';
import './UserReview.css';

interface UserReviewProps {
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export function UserReview({ userName, rating, date, comment, verified = true }: UserReviewProps) {
  return (
    <div className="user-review">
      {/* Header */}
      <div className="review-header">
        <div className="review-user-info">
          <div className="review-user-name-row">
            <span className="review-user-name">{userName}</span>
            {verified && (
              <span className="review-verified-badge">
                Vérifié
              </span>
            )}
          </div>
          <div className="review-rating-row">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`review-star ${
                  index < rating ? 'filled' : 'empty'
                }`}
              />
            ))}
            <span className="review-date">{date}</span>
          </div>
        </div>
      </div>
      
      {/* Comment */}
      <p className="review-comment">
        "{comment}"
      </p>
      
      {/* Helpful Section */}
      <div className="review-footer">
        <button className="review-footer-button">
          Utile ({Math.floor(Math.random() * 50 + 10)})
        </button>
        <span className="review-footer-separator">•</span>
        <button className="review-footer-button">
          Signaler un abus
        </button>
      </div>
    </div>
  );
}