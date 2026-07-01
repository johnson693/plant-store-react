import { Star, Quote } from 'lucide-react';
import './TestimonialCard.css';

export default function TestimonialCard({ review }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__quote-icon">
        <Quote width={16} height={16} color="#2D6A4F" />
      </div>
      <div className="testimonial-card__stars">
        {[1,2,3,4,5].map(s => (
          <Star key={s} width={16} height={16}
            fill={s <= review.rating ? '#facc15' : 'none'}
            color={s <= review.rating ? '#facc15' : '#e5e7eb'} />
        ))}
      </div>
      <p className="testimonial-card__text">"{review.review}"</p>
      <div className="testimonial-card__plant-tag">🌿 {review.plant}</div>
      <div className="testimonial-card__author-row">
        <img src={review.avatar} alt={review.name} className="testimonial-card__avatar" />
        <div>
          <div className="testimonial-card__author-name">{review.name}</div>
          <div className="testimonial-card__author-meta">{review.location} · {review.date}</div>
        </div>
      </div>
    </div>
  );
}
