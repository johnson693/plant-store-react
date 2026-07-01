import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'
import { reviews } from '../data/plants.js'
import { trendingPlants } from '../data/plants.js'
import './pages.css'

export default function ReviewsPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <div className="page__header">
        <div className="container">
          <div className="page__header-inner">
            <button className="page__back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft width={16} height={16} /> Back
            </button>
            <div>
              <h1 className="page__title">My Reviews</h1>
              <p className="page__subtitle">{reviews.length} reviews written</p>
            </div>
          </div>
        </div>
      </div>
      <div className="page__body">
        <div className="container">
          {reviews.map((r, i) => (
            <div key={r.id} className="my-review-card">
              <img src={trendingPlants[i % 3].image} alt={r.plant} />
              <div className="my-review-card__content">
                <div className="my-review-card__plant">{r.plant}</div>
                <div className="my-review-card__stars">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} width={14} height={14}
                      fill={s <= r.rating ? '#facc15' : 'none'}
                      color={s <= r.rating ? '#facc15' : '#e5e7eb'} />
                  ))}
                </div>
                <div className="my-review-card__text">"{r.review}"</div>
                <div className="my-review-card__date">{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
