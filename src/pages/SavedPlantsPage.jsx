import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { topSellingPlants } from '../data/plants.js'
import './pages.css'

export default function SavedPlantsPage() {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(topSellingPlants.slice(0, 4))

  const remove = (id) => setSaved(prev => prev.filter(p => p.id !== id))

  return (
    <div className="page">
      <div className="page__header">
        <div className="container">
          <div className="page__header-inner">
            <button className="page__back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft width={16} height={16} /> Back
            </button>
            <div>
              <h1 className="page__title">Saved Plants</h1>
              <p className="page__subtitle">{saved.length} plant{saved.length !== 1 ? 's' : ''} saved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page__body">
        <div className="container">
          {saved.length === 0 ? (
            <div className="page-empty">
              <p>No saved plants yet. Browse the shop and heart your favourites!</p>
            </div>
          ) : (
            <div className="saved__grid">
              {saved.map(plant => (
                <div key={plant.id} className="saved-item">
                  <img src={plant.image} alt={plant.name} />
                  <div className="saved-item__body">
                    <div className="saved-item__name">{plant.name}</div>
                    <div className="saved-item__price">${plant.price}</div>
                    <div className="saved-item__actions">
                      <button className="saved-item__add">
                        <ShoppingCart width={14} height={14} style={{marginRight:'0.25rem', display:'inline'}} />
                        Add to Cart
                      </button>
                      <button className="saved-item__remove" onClick={() => remove(plant.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
