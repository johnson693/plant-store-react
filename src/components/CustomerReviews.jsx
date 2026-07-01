import TestimonialCard from './TestimonialCard.jsx';
import SectionTitle from './SectionTitle.jsx';
import { Star } from 'lucide-react';
import './CustomerReviews.css';

export default function CustomerReviews({ reviews }) {
  return (
    <section className="reviews">
      <div className="container">
        <div className="reviews__heading">
          <SectionTitle
            eyebrow="Happy Customers"
            title="What Our Customers Say"
            subtitle="Don't just take our word for it — thousands of plant parents share their experience."
            centered
          />
          <div className="reviews__rating-badge">
            <div className="reviews__stars">
              {[1,2,3,4,5].map(s => <Star key={s} width={20} height={20} fill="#facc15" color="#facc15" />)}
            </div>
            <span className="reviews__score">4.9 / 5.0</span>
            <span className="reviews__count">based on 12,400+ reviews</span>
          </div>
        </div>
        <div className="reviews__grid">
          {reviews.map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
