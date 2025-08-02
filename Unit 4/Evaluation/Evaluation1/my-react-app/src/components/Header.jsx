import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <Link to="/" className="logo">Recipe Finder</Link>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}
