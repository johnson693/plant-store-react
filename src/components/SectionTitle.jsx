import './SectionTitle.css';

export default function SectionTitle({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`section-title ${centered ? 'centered' : ''}`}>
      {eyebrow && (
        <span className="section-title__eyebrow">
          <span className="section-title__eyebrow-line" />
          {eyebrow}
          <span className="section-title__eyebrow-line" />
        </span>
      )}
      <h2 className="section-title__heading">{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </div>
  );
}
