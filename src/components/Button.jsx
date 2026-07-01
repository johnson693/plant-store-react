import './Button.css';

export default function Button({ children, variant = 'primary', size = 'md', href, onClick, className = '' }) {
  const cls = `btn btn-${variant} btn-${size} ${className}`;

  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}
