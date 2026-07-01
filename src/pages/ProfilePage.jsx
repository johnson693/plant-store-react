import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, CheckCircle } from 'lucide-react'
import './pages.css'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    firstName: 'Johnson', lastName: 'D Souza',
    email: 'johnson@email.com', phone: '+91 98765 43210',
    dob: '2002-05-15', gender: 'Male',
  })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="page">
      <div className="page__header">
        <div className="container">
          <div className="page__header-inner">
            <button className="page__back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft width={16} height={16} /> Back
            </button>
            <div>
              <h1 className="page__title">My Profile</h1>
              <p className="page__subtitle">Manage your personal information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page__body">
        <div className="container">
          {saved && (
            <div className="page-success">
              <CheckCircle width={18} height={18} /> Profile saved successfully!
            </div>
          )}

          <div className="page-card">
            <div className="profile__avatar-section">
              <div className="profile__avatar-circle">J</div>
              <div>
                <div className="profile__avatar-name">{form.firstName} {form.lastName}</div>
                <div className="profile__avatar-email">{form.email}</div>
                <button className="profile__avatar-change">Change Photo</button>
              </div>
            </div>

            <div className="profile__form">
              <div className="profile__row">
                <div className="profile__field">
                  <label className="profile__label">First Name</label>
                  <input className="profile__input" name="firstName" value={form.firstName} onChange={handleChange} />
                </div>
                <div className="profile__field">
                  <label className="profile__label">Last Name</label>
                  <input className="profile__input" name="lastName" value={form.lastName} onChange={handleChange} />
                </div>
              </div>
              <div className="profile__field">
                <label className="profile__label">Email Address</label>
                <input className="profile__input" name="email" type="email" value={form.email} onChange={handleChange} />
              </div>
              <div className="profile__row">
                <div className="profile__field">
                  <label className="profile__label">Phone Number</label>
                  <input className="profile__input" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="profile__field">
                  <label className="profile__label">Date of Birth</label>
                  <input className="profile__input" name="dob" type="date" value={form.dob} onChange={handleChange} />
                </div>
              </div>
              <div className="profile__field">
                <label className="profile__label">Gender</label>
                <select className="profile__input" name="gender" value={form.gender} onChange={handleChange}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <button className="profile__save-btn" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
