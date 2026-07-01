import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './pages.css'

const TOGGLES = [
  { key: 'orders',    label: 'Order Updates',       desc: 'Get notified when your order status changes' },
  { key: 'offers',    label: 'Deals & Offers',       desc: 'Receive exclusive discounts and promotions' },
  { key: 'tips',      label: 'Plant Care Tips',      desc: 'Weekly tips to keep your plants healthy' },
  { key: 'newsletter',label: 'Newsletter',           desc: 'Monthly newsletter with new arrivals' },
]

export default function SettingsPage() {
  const navigate = useNavigate()
  const [toggles, setToggles] = useState({ orders: true, offers: true, tips: false, newsletter: false })

  const flip = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="page">
      <div className="page__header">
        <div className="container">
          <div className="page__header-inner">
            <button className="page__back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft width={16} height={16} /> Back
            </button>
            <div>
              <h1 className="page__title">Settings</h1>
              <p className="page__subtitle">Manage your preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page__body">
        <div className="container">
          <div className="page-card">
            <div className="page-card__title">Notifications</div>
            <div className="settings__section">
              {TOGGLES.map(({ key, label, desc }) => (
                <div key={key} className="settings__toggle-row">
                  <div>
                    <div className="settings__toggle-name">{label}</div>
                    <div className="settings__toggle-label">{desc}</div>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" checked={toggles[key]} onChange={() => flip(key)} />
                    <span className="toggle__slider" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="page-card">
            <div className="page-card__title">Account</div>
            <div className="settings__danger">
              <div className="settings__danger-title">Danger Zone</div>
              <button className="settings__danger-btn">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
