import { ArrowRight, Leaf, Star, Package, Truck } from 'lucide-react';
import './HeroBanner.css';

const stats = [
  { icon: Leaf, value: '500+', label: 'Plant Varieties' },
  { icon: Star, value: '4.9★', label: 'Customer Rating' },
  { icon: Package, value: '50K+', label: 'Orders Delivered' },
  { icon: Truck, value: 'Free', label: 'Shipping $50+' },
];

export default function HeroBanner() {
  return (
    <section id="home" className="hero">
      <div className="hero__blob-1" />
      <div className="hero__blob-2" />

      <div className="container hero__inner">
        <div className="hero__grid">

          <div className="fade-in-up">
            <div className="hero__badge">
              <Leaf width={16} height={16} />
              <span>🌿 Free shipping on orders over $50</span>
            </div>

            <h1 className="hero__title">
              Bring Nature{' '}
              <span className="hero__title-highlight">
                <span className="hero__title-highlight-text">Indoors</span>
                <svg viewBox="0 0 200 10" fill="none">
                  <path d="M0 8 Q100 0 200 8" stroke="#52B788" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
              <br />With Our Plants
            </h1>

            <p className="hero__desc">
              Discover over 500 hand-picked plants to transform your space. From low-maintenance succulents to statement tropical palms — there's a perfect plant for every home.
            </p>

            <div className="hero__cta-row">
              <a href="#shop" className="btn btn-primary btn-lg">
                Shop All Plants
                <ArrowRight width={16} height={16} />
              </a>
              <a href="#trending" className="btn btn-outline btn-lg">
                View Trending
              </a>
            </div>

            <div className="hero__stats">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="hero__stat">
                  <div className="hero__stat-icon">
                    <Icon width={20} height={20} color="#2D6A4F" />
                  </div>
                  <div className="hero__stat-value">{value}</div>
                  <div className="hero__stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__image-wrap">
            <div className="hero__image-frame">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=700&fit=crop&auto=format"
                alt="Beautiful indoor plant collection"
              />
              <div className="hero__image-overlay" />
            </div>

            <div className="hero__float-card">
              <div className="hero__float-icon">
                <Leaf width={24} height={24} color="#2D6A4F" />
              </div>
              <div>
                <div className="hero__float-title">500+ Plants</div>
                <div className="hero__float-sub">In our catalog</div>
              </div>
            </div>

            <div className="hero__review-card">
              <div className="hero__review-stars">
                {[1,2,3,4,5].map(s => <Star key={s} width={14} height={14} fill="#facc15" color="#facc15" />)}
              </div>
              <div className="hero__review-quote">"Plants arrived perfect!"</div>
              <div className="hero__review-author">— Sarah M., 2 days ago</div>
            </div>

            <div className="hero__accent-image">
              <img src="https://images.unsplash.com/photo-1459156212016-c812468e2115?w=200&h=200&fit=crop&auto=format" alt="Succulent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
