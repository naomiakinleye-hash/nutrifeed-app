import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <span className="navbar-brand" onClick={() => navigate('/')}>
        BSF NutriFeed
      </span>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Dashboard
        </NavLink>
        <NavLink to="/calculator" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Feed Calculator
        </NavLink>
        <NavLink to="/learn" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Learn
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;