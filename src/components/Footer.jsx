import { useState } from 'react'
import { Leaf, Mail, Phone, MapPin, ArrowRight, Share2, MessageCircle, Camera, PlayCircle } from 'lucide-react'
import './Footer.css'

const quickLinks = ['Home', 'Shop', 'About Us', 'Blog', 'Contact']
const categories = ['Indoor Plants', 'Outdoor Plants', 'Succulents', 'Tropical', 'Air Purifiers', 'Plant Care']
const support = ['FAQ', 'Shipping Policy', 'Returns', 'Track Order', 'Gift Cards']
const socials = [
  { Icon: Share2, label: 'Facebook' },
  { Icon: MessageCircle, label: 'Twitter' },
  { Icon: Camera, label: 'Instagram' },
  { Icon: PlayCircle, label: 'YouTube' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="footer">

      {/* Newsletter */}
      <div className="footer__newsletter">
        <div className="container">
          <div className="footer__newsletter-inner">
            <div>
              <h3 className="footer__newsletter-heading">Get Plant Care Tips & Exclusive Offers</h3>
              <p className="footer__newsletter-sub">Join 25,000+ plant lovers. Unsubscribe anytime.</p>
            </div>
            <form onSubmit={handleSubscribe} className="footer__newsletter-form">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="footer__email-input"
              />
              <button type="submit" className="footer__subscribe-btn">
                {subscribed ? '✓ Done!' : <><span>Subscribe</span><ArrowRight width={16} height={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main body */}
      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">

            {/* Brand */}
            <div>
              <div className="footer__brand-logo">
                <div className="footer__brand-icon">
                  <Leaf width={20} height={20} color="#fff" />
                </div>
                <span className="footer__brand-name">
                  Green<span className="footer__brand-accent">Leaf</span>
                </span>
              </div>
              <p className="footer__brand-desc">
                Your trusted source for premium indoor and outdoor plants. We deliver happiness, one plant at a time.
              </p>
              <ul className="footer__contact-list">
                {[
                  [Mail, 'hello@greenleaf.com'],
                  [Phone, '+1 (800) 123-PLANTS'],
                  [MapPin, '123 Garden Lane, Green City, CA 90210'],
                ].map(([Icon, text]) => (
                  <li key={text} className="footer__contact-item">
                    <Icon width={16} height={16} color="#52B788" style={{ flexShrink: 0 }} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <div className="footer__socials">
                {socials.map(({ Icon, label }) => (
                  <button key={label} type="button" aria-label={label} className="footer__social-btn">
                    <Icon width={16} height={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer__col-heading">Quick Links</h4>
              <ul className="footer__link-list">
                {quickLinks.map(link => (
                  <li key={link}>
                    <button type="button" className="footer__link">{link}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="footer__col-heading">Categories</h4>
              <ul className="footer__link-list">
                {categories.map(cat => (
                  <li key={cat}>
                    <button type="button" className="footer__link">{cat}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="footer__col-heading">Support</h4>
              <ul className="footer__link-list">
                {support.map(item => (
                  <li key={item}>
                    <button type="button" className="footer__link">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} GreenLeaf. All rights reserved.</span>
            <div className="footer__bottom-links">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
                <button key={link} type="button" className="footer__bottom-link">{link}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
