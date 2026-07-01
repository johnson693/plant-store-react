import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, ShoppingCart } from 'lucide-react'
import { trendingPlants, topSellingPlants } from '../data/plants.js'
import './pages.css'

const INIT_CART = [
  { ...trendingPlants[0], qty: 1 },
  { ...trendingPlants[1], qty: 2 },
  { ...topSellingPlants[2], qty: 1 },
]

export default function CartPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState(INIT_CART)

  const changeQty = (id, delta) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping  = subtotal > 50 ? 0 : 5.99
  const tax       = subtotal * 0.08
  const total     = subtotal + shipping + tax

  return (
    <div className="page">
      <div className="page__header">
        <div className="container">
          <div className="page__header-inner">
            <button className="page__back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft width={16} height={16} /> Back
            </button>
            <div>
              <h1 className="page__title">Your Cart</h1>
              <p className="page__subtitle">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page__body">
        <div className="container">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart width={64} height={64} />
              <p>Your cart is empty</p>
              <button className="profile__save-btn" onClick={() => navigate('/')}>Continue Shopping</button>
            </div>
          ) : (
            <div className="cart__layout">
              {/* Items */}
              <div className="page-card">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item__info">
                      <div className="cart-item__name">{item.name}</div>
                      <div className="cart-item__cat">{item.category}</div>
                      <div className="cart-item__price">${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                    <div className="cart-item__qty">
                      <button className="cart-item__qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                      <span className="cart-item__qty-num">{item.qty}</span>
                      <button className="cart-item__qty-btn" onClick={() => changeQty(item.id, +1)}>+</button>
                    </div>
                    <button className="cart-item__remove" onClick={() => remove(item.id)} aria-label="Remove">
                      <Trash2 width={17} height={17} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="cart-summary">
                <div className="page-card">
                  <div className="page-card__title">Order Summary</div>
                  <div className="cart-summary__row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="cart-summary__row"><span>Shipping</span><span>{shipping === 0 ? 'Free 🎉' : `$${shipping}`}</span></div>
                  <div className="cart-summary__row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="cart-summary__row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                  <button className="cart-summary__checkout">Proceed to Checkout</button>
                  <button className="cart-summary__continue" onClick={() => navigate('/')}>Continue Shopping</button>
                </div>
                {subtotal < 50 && (
                  <div className="page-card" style={{marginTop:'0', background:'var(--green-pale)', border:'none'}}>
                    <p style={{fontSize:'0.85rem', color:'var(--green-primary)', fontWeight:600}}>
                      🚚 Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
