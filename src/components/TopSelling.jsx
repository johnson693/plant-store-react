import { useState } from 'react'
import PlantCard from './PlantCard.jsx'
import SectionTitle from './SectionTitle.jsx'
import { ArrowRight } from 'lucide-react'
import './TopSelling.css'

const categories = ['All', 'Indoor', 'Outdoor', 'Succulents', 'Tropical', 'Air Purifiers']

export default function TopSelling({ plants }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? plants
    : plants.filter(p => p.filterTag === activeCategory)

  return (
    <section id="shop" className="top-selling">
      <div className="container">
        <div className="top-selling__header">
          <SectionTitle
            eyebrow="Top Picks"
            title="Top Selling Plants"
            subtitle="Our best-sellers, chosen by thousands of happy customers."
          />
        </div>

        <div className="top-selling__tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`top-selling__tab ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="top-selling__empty">
            <p>No plants found in this category.</p>
          </div>
        ) : (
          <div className="top-selling__grid">
            {filtered.map((plant) => (
              <PlantCard key={plant.id} plant={plant} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
