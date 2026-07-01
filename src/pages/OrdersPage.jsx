import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { trendingPlants, topSellingPlants } from '../data/plants.js'
import './pages.css'

const ORDERS = [
  {
    id: '#ORD-2024-001', date: 'June 20, 2025', status: 'Delivered',
    items: [{ ...trendingPlants[0], qty: 1 }, { ...topSellingPlants[0], qty: 1 }],
    total: 139.98,
  },
  {
    id: '#ORD-2024-002', date: 'June 28, 2025', status: 'Processing',
    items: [{ ...trendingPlants[1], qty: 2 }],
    total: 69.98,
  },
  {
    id: '#ORD-2024-003', date: 'July 1, 2025', status: 'Shipped',
    items: [{ ...topSellingPlants[3], qty: 1 }],
    total: 74.99,
  },
]

const tabs = ['All', 'Processing', 'Shipped', 'Delivered']

export default function OrdersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All' ? ORDERS : ORDERS.filter(o => o.status === activeTab)

  return (
    <div className="page">
      <div className="page__header">
        <div className="container">
          <div className="page__header-inner">
            <button className="page__back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft width={16} height={16} /> Back
            </button>
            <div>
              <h1 className="page__title">My Orders</h1>
              <p className="page__subtitle">{ORDERS.length} orders placed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page__body">
        <div className="container">
          <div className="orders__tabs">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`orders__tab ${activeTab === tab ? 'active' : ''}`}>
                {tab}
              </button>
            ))}
          </div>

          {filtered.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card__header">
                <div>
                  <div className="order-card__id">{order.id}</div>
                  <div className="order-card__date">{order.date}</div>
                </div>
                <span className={`order-card__status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
              <div className="order-card__body">
                {order.items.map(item => (
                  <div key={item.id} className="order-card__item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <div className="order-card__item-name">{item.name}</div>
                      <div className="order-card__item-qty">Qty: {item.qty} × ${item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-card__footer">
                <span className="order-card__total">Total: ${order.total.toFixed(2)}</span>
                <button className="order-card__btn">
                  {order.status === 'Delivered' ? 'Reorder' : 'Track Order'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
