import { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import './PlantCard.css';

export default function PlantCard({ plant, variant = 'default' }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (variant === 'trending') {
    return (
      <div className="plant-card plant-card--trending">
        <div className="plant-card__image-wrap">
          <img src={plant.image} alt={plant.name} />
          {plant.badge && <span className="plant-card__badge">{plant.badge}</span>}
          <span className="plant-card__discount">-{discount}%</span>
          <div className="plant-card__hover-actions">
            <button onClick={() => setWished(!wished)}
              className={`plant-card__icon-btn ${wished ? 'wished' : ''}`}
              aria-label="Wishlist">
              <Heart width={16} height={16} fill={wished ? 'currentColor' : 'none'} />
            </button>
            <button className="plant-card__icon-btn" aria-label="Quick view">
              <Eye width={16} height={16} />
            </button>
          </div>
        </div>
        <div className="plant-card__body">
          <div className="plant-card__category">{plant.category}</div>
          <h3 className="plant-card__name">{plant.name}</h3>
          <p className="plant-card__desc">{plant.description}</p>
          <div className="plant-card__rating">
            {[1,2,3,4,5].map(s => (
              <Star key={s} width={14} height={14}
                fill={s <= Math.round(plant.rating) ? '#facc15' : 'none'}
                color={s <= Math.round(plant.rating) ? '#facc15' : '#e5e7eb'} />
            ))}
            <span className="plant-card__rating-count">({plant.reviews})</span>
          </div>
          <div className="plant-card__footer-row">
            <div className="plant-card__price-row">
              <span className="plant-card__price">${plant.price}</span>
              <span className="plant-card__original-price">${plant.originalPrice}</span>
            </div>
            <button onClick={handleAddToCart}
              className={`plant-card__cart-btn ${added ? 'added' : ''}`}
              aria-label={`Add ${plant.name} to cart`}>
              <ShoppingCart width={16} height={16} />
              {added ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-card plant-card--grid">
      <div className="plant-card__image-wrap">
        <img src={plant.image} alt={plant.name} />
        <span className="plant-card__discount">-{discount}%</span>
        <div className="plant-card__grid-actions">
          <button onClick={handleAddToCart} className={`plant-card__add-btn ${added ? 'added' : ''}`}>
            <ShoppingCart width={16} height={16} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
          <button onClick={() => setWished(!wished)}
            className={`plant-card__wish-btn-grid ${wished ? 'wished' : ''}`}
            aria-label="Wishlist">
            <Heart width={16} height={16} fill={wished ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      <div className="plant-card__body">
        <div className="plant-card__category">{plant.category}</div>
        <h3 className="plant-card__name">{plant.name}</h3>
        <div className="plant-card__rating">
          {[1,2,3,4,5].map(s => (
            <Star key={s} width={12} height={12}
              fill={s <= Math.round(plant.rating) ? '#facc15' : 'none'}
              color={s <= Math.round(plant.rating) ? '#facc15' : '#e5e7eb'} />
          ))}
          <span className="plant-card__rating-count">({plant.reviews})</span>
        </div>
        <div className="plant-card__price-row">
          <span className="plant-card__price">${plant.price}</span>
          <span className="plant-card__original-price">${plant.originalPrice}</span>
        </div>
      </div>
    </div>
  );
}
