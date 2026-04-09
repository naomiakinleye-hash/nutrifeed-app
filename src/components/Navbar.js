// Navbar.js — Updated for Week 3
// Added: Login/Sign Up link when logged out, Profile link when logged in.
// Auth state is mocked for now — will connect to Firebase in next phase.

import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

// Temporary mock — replace with Firebase auth state in next phase
const IS_LOGGED_IN = false;

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

        {IS_LOGGED_IN ? (
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Profile
          </NavLink>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link nav-link--cta active' : 'nav-link nav-link--cta'}>
            Log in
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;