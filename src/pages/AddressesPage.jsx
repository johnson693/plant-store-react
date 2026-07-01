import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import './pages.css'

const INIT = [
  { id: 1, type: 'Home', line1: '24 Garden View Lane', line2: 'Mangaluru, Karnataka 575001', isDefault: true },
  { id: 2, type: 'Work', line1: 'KodNest Technologies, Bejai', line2: 'Mangaluru, Karnataka 575004', isDefault: false },
]

export default function AddressesPage() {
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState(INIT)

  const remove = (id) => setAddresses(prev => prev.filter(a => a.id !== id))
  const setDefault = (id) => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))

  return (
    <div className="page">
      <div className="page__header">
        <div className="container">
          <div className="page__header-inner">
            <button className="page__back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft width={16} height={16} /> Back
            </button>
            <div>
              <h1 className="page__title">My Addresses</h1>
              <p className="page__subtitle">Manage your delivery addresses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page__body">
        <div className="container">
          {addresses.map(addr => (
            <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
              {addr.isDefault && <span className="address-card__default-badge">Default</span>}
              <div className="address-card__type">{addr.type}</div>
              <div className="address-card__text">{addr.line1}<br />{addr.line2}</div>
              <div className="address-card__actions">
                <button className="address-card__btn edit">Edit</button>
                {!addr.isDefault && (
                  <button className="address-card__btn edit" onClick={() => setDefault(addr.id)}>Set Default</button>
                )}
                <button className="address-card__btn remove" onClick={() => remove(addr.id)}>Remove</button>
              </div>
            </div>
          ))}
          <button className="address-add">
            <Plus width={18} height={18} /> Add New Address
          </button>
        </div>
      </div>
    </div>
  )
}
