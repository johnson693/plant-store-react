import PlantCard from './PlantCard.jsx';
import SectionTitle from './SectionTitle.jsx';
import { ArrowRight } from 'lucide-react';
import './TrendingPlants.css';

export default function TrendingPlants({ plants }) {
  return (
    <section id="trending" className="trending">
      <div className="container">
        <div className="trending__header">
          <SectionTitle
            eyebrow="What's Hot"
            title="Trending Plants"
            subtitle="Our most-loved picks this season — curated by plant enthusiasts."
          />
          <a href="#shop" className="btn btn-outline btn-sm trending__view-all">
            View All <ArrowRight width={16} height={16} />
          </a>
        </div>
        <div className="trending__grid">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} variant="trending" />
          ))}
        </div>
      </div>
    </section>
  );
}
