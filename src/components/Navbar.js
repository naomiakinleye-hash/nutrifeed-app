import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const navigate    = useNavigate();
  const { t }       = useTranslation();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <span className="navbar-brand" onClick={() => navigate('/')}>
        BSF NutriFeed
      </span>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          {t('nav.home')}
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          {t('nav.dashboard')}
        </NavLink>
        <NavLink to="/calculator" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          {t('nav.calculator')}
        </NavLink>
        <NavLink to="/learn" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          {t('nav.learn')}
        </NavLink>
        {user && (
          <button className="nav-link nav-link--logout" onClick={handleLogout}>
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;