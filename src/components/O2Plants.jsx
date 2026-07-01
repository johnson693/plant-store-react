import { Wind, Leaf, ArrowRight, CheckCircle } from 'lucide-react';
import './O2Plants.css';

const benefits = [
  'Removes toxins like benzene & formaldehyde',
  'Increases humidity naturally',
  'Boosts focus & productivity',
  'Reduces stress & anxiety',
];

export default function O2Plants() {
  return (
    <section className="o2">
      <div className="container">
        <div className="o2__grid">

          <div className="o2__image-col">
            <div className="o2__image-frame">
              <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700&h=600&fit=crop&auto=format"
                alt="O2 air-purifying plants"
              />
              <div className="o2__image-overlay" />
            </div>
            <div className="o2__stat-card">
              <div className="o2__stat-icon">
                <Wind width={28} height={28} color="#2D6A4F" />
              </div>
              <div className="o2__stat-value">87%</div>
              <div className="o2__stat-label">Air Quality<br/>Improvement</div>
            </div>
            <div className="o2__blur-blob" />
          </div>

          <div className="o2__content-col">
            <div className="o2__badge">
              <Leaf width={16} height={16} />
              O₂ Plant Collection
            </div>
            <h2 className="o2__title">
              Breathe Cleaner Air <span className="o2__title-accent">Every Day</span>
            </h2>
            <p className="o2__desc">
              Our O₂ Plant collection features nature's best air purifiers. Scientifically proven to remove harmful toxins and increase oxygen levels — turning your home into a healthier sanctuary.
            </p>
            <ul className="o2__benefits">
              {benefits.map((benefit) => (
                <li key={benefit} className="o2__benefit">
                  <CheckCircle width={20} height={20} color="#52B788" style={{ flexShrink: 0 }} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="o2__cta-row">
              <a href="#shop" className="btn btn-primary btn-lg">
                Shop O₂ Plants <ArrowRight width={20} height={20} />
              </a>
              <button type="button" className="btn btn-outline btn-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
