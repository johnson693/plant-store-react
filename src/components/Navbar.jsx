import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ShoppingCart, Search, User, Leaf, Menu, X,
  Heart, Trash2, Package, MapPin, Settings, LogOut, Star
} from 'lucide-react'
import { trendingPlants, topSellingPlants } from '../data/plants.js'
import './Navbar.css'

const allPlants = [...trendingPlants, ...topSellingPlants]

const INITIAL_CART = [
  { ...trendingPlants[0], qty: 1 },
  { ...trendingPlants[1], qty: 2 },
]
const INITIAL_FAVS = [
  topSellingPlants[0],
  topSellingPlants[2],
]

export default function Navbar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const isHome    = location.pathname === '/'

  const [menuOpen, setMenuOpen]       = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [cartOpen, setCartOpen]       = useState(false)
  const [favOpen, setFavOpen]         = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [query, setQuery]             = useState('')
  const [cartItems, setCartItems]     = useState(INITIAL_CART)
  const [favItems, setFavItems]       = useState(INITIAL_FAVS)
  const inputRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeAll = () => {
    setSearchOpen(false); setCartOpen(false)
    setFavOpen(false); setProfileOpen(false)
  }

  const toggle = (panel) => {
    const cur = { searchOpen, cartOpen, favOpen, profileOpen }
    closeAll()
    if (panel === 'search'  && !cur.searchOpen)  { setSearchOpen(true); setTimeout(() => inputRef.current?.focus(), 50) }
    if (panel === 'cart'    && !cur.cartOpen)    setCartOpen(true)
    if (panel === 'fav'     && !cur.favOpen)     setFavOpen(true)
    if (panel === 'profile' && !cur.profileOpen) setProfileOpen(true)
  }

  // Scroll to section on homepage, navigate first if on another page
  const goSection = (id) => {
    setMenuOpen(false); closeAll()
    if (!isHome) {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'Home',    action: () => goSection('home') },
    { label: 'Shop',    action: () => goSection('shop') },
    { label: 'About',   action: () => goSection('home') },
    { label: 'Blog',    action: () => goSection('home') },
    { label: 'Contact', action: () => goSection('home') },
  ]

  const results = query.trim().length > 0
    ? allPlants.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : []

  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const changeQty = (id, delta) =>
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  const removeCart = (id) => setCartItems(prev => prev.filter(i => i.id !== id))
  const removeFav  = (id) => setFavItems(prev => prev.filter(i => i.id !== id))

  const anyOpen = searchOpen || cartOpen || favOpen || profileOpen

  return (
    <>
      {anyOpen && <div className="navbar__backdrop" onClick={closeAll} />}

      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <nav className="container">
          <div className="navbar__inner">

            {/* Logo */}
            <button className="navbar__logo" onClick={() => navigate('/')} style={{background:'none',border:'none',cursor:'pointer'}}>
              <div className="navbar__logo-icon">
                <Leaf width={20} height={20} color="#fff" />
              </div>
              <span className="navbar__logo-text">
                Green<span className="navbar__logo-accent">Leaf</span>
              </span>
            </button>

            {/* Desktop nav links */}
            <ul className="navbar__links">
              {navLinks.map(({ label, action }) => (
                <li key={label}>
                  <button className="nav-link" onClick={action}>{label}</button>
                </li>
              ))}
            </ul>

            {/* Desktop icons */}
            <div className="navbar__icons">

              {/* Search */}
              <div className="navbar__search-wrap">
                <button onClick={() => toggle('search')} className={`navbar__icon-btn ${searchOpen ? 'active' : ''}`} aria-label="Search">
                  <Search width={20} height={20} />
                </button>
                {searchOpen && (
                  <div className="navbar__search-popover">
                    <div className="navbar__search-input-row">
                      <Search width={16} height={16} color="#9ca3af" />
                      <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search plants..." />
                      {query && <button onClick={() => setQuery('')} style={{background:'none',border:'none',cursor:'pointer',display:'flex'}}><X width={14} height={14} color="#9ca3af" /></button>}
                    </div>
                    <div className="navbar__search-results">
                      {query.trim() === '' && <p className="navbar__search-empty">Start typing to search plants…</p>}
                      {query.trim() !== '' && results.length === 0 && <p className="navbar__search-empty">No plants found for "{query}"</p>}
                      {results.map(plant => (
                        <button key={plant.id} className="navbar__search-item" onClick={closeAll}>
                          <img src={plant.image} alt={plant.name} />
                          <div>
                            <div className="navbar__search-item-name">{plant.name}</div>
                            <div className="navbar__search-item-price">${plant.price}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Favourites */}
              <div className="navbar__fav-wrap">
                <button onClick={() => toggle('fav')} className={`navbar__icon-btn ${favOpen ? 'active' : ''}`} aria-label="Favourites">
                  <Heart width={20} height={20} fill={favItems.length > 0 ? '#ef4444' : 'none'} color={favItems.length > 0 ? '#ef4444' : 'currentColor'} />
                  {favItems.length > 0 && <span className="navbar__cart-badge">{favItems.length}</span>}
                </button>
                {favOpen && (
                  <div className="navbar__fav-dropdown">
                    <div className="navbar__fav-header">
                      <span className="navbar__fav-title">Favourites</span>
                      <button className="navbar__view-all-btn" onClick={() => { closeAll(); navigate('/saved') }}>View All</button>
                    </div>
                    <div className="navbar__fav-items">
                      {favItems.length === 0 && <p className="navbar__fav-empty">No favourites yet!</p>}
                      {favItems.map(item => (
                        <div key={item.id} className="navbar__fav-item">
                          <img src={item.image} alt={item.name} />
                          <div className="navbar__fav-item-info">
                            <div className="navbar__fav-item-name">{item.name}</div>
                            <div className="navbar__fav-item-price">${item.price}</div>
                          </div>
                          <button className="navbar__fav-item-remove" onClick={() => removeFav(item.id)}><Trash2 width={15} height={15} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <div className="navbar__cart-wrap">
                <button onClick={() => toggle('cart')} className={`navbar__icon-btn ${cartOpen ? 'active' : ''}`} aria-label="Cart">
                  <ShoppingCart width={20} height={20} />
                  {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
                </button>
                {cartOpen && (
                  <div className="navbar__cart-dropdown">
                    <div className="navbar__cart-header">
                      <span className="navbar__cart-title">Your Cart</span>
                      <span className="navbar__cart-count">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="navbar__cart-items">
                      {cartItems.length === 0 && <p className="navbar__cart-empty">Your cart is empty!</p>}
                      {cartItems.map(item => (
                        <div key={item.id} className="navbar__cart-item">
                          <img src={item.image} alt={item.name} />
                          <div className="navbar__cart-item-info">
                            <div className="navbar__cart-item-name">{item.name}</div>
                            <div className="navbar__cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                          </div>
                          <div className="navbar__cart-item-qty">
                            <button className="navbar__qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                            <span>{item.qty}</span>
                            <button className="navbar__qty-btn" onClick={() => changeQty(item.id, +1)}>+</button>
                          </div>
                          <button className="navbar__cart-item-remove" onClick={() => removeCart(item.id)}><Trash2 width={15} height={15} /></button>
                        </div>
                      ))}
                    </div>
                    {cartItems.length > 0 && (
                      <div className="navbar__cart-footer">
                        <div className="navbar__cart-total-row">
                          <span>Total</span><span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="navbar__cart-checkout" onClick={() => { closeAll(); navigate('/cart') }}>
                          View Cart & Checkout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="navbar__profile-wrap">
                <button onClick={() => toggle('profile')} className={`navbar__icon-btn ${profileOpen ? 'active' : ''}`} aria-label="Profile">
                  <User width={20} height={20} />
                </button>
                {profileOpen && (
                  <div className="navbar__profile-dropdown">
                    <div className="navbar__profile-header">
                      <div className="navbar__profile-avatar">J</div>
                      <div>
                        <div className="navbar__profile-name">Johnson D Souza</div>
                        <div className="navbar__profile-email">johnson@email.com</div>
                      </div>
                    </div>
                    <div className="navbar__profile-menu">
                      {[
                        { icon: User,    label: 'My Profile',   path: '/profile' },
                        { icon: Package, label: 'My Orders',    path: '/orders' },
                        { icon: Heart,   label: 'Saved Plants', path: '/saved' },
                        { icon: MapPin,  label: 'Addresses',    path: '/addresses' },
                        { icon: Star,    label: 'My Reviews',   path: '/my-reviews' },
                        { icon: Settings,label: 'Settings',     path: '/settings' },
                      ].map(({ icon: Icon, label, path }) => (
                        <button key={label} className="navbar__profile-item"
                          onClick={() => { closeAll(); navigate(path) }}>
                          <Icon width={16} height={16} /> {label}
                        </button>
                      ))}
                      <div className="navbar__profile-divider" />
                      <button className="navbar__profile-item logout">
                        <LogOut width={16} height={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button className="btn btn-primary btn-sm" style={{ marginLeft: '0.5rem' }}
                onClick={() => goSection('shop')}>
                Shop Now
              </button>
            </div>

            {/* Mobile icons */}
            <div className="navbar__mobile-icons">
              <button aria-label="Cart" onClick={() => { navigate('/cart') }}>
                <ShoppingCart width={20} height={20} />
                {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="navbar__menu-toggle"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
                {menuOpen ? <X width={24} height={24} /> : <Menu width={24} height={24} />}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <div className={`navbar__drawer ${menuOpen ? 'open' : ''}`}>
            <ul className="navbar__drawer-links">
              {navLinks.map(({ label, action }) => (
                <li key={label}>
                  <button className="navbar__drawer-link" onClick={action}>{label}</button>
                </li>
              ))}
              <li className="navbar__drawer-cta">
                <button className="btn btn-primary btn-md" style={{ display:'block', width:'100%' }}
                  onClick={() => goSection('shop')}>
                  Shop Now
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}
