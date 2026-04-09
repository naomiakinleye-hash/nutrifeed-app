import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import FeedCalculator from './pages/FeedCalculator';
import Learn from './pages/Learn';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ConsentBanner from './components/ConsentBanner';
import FloatingMenu from './components/FloatingMenu';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ConsentBanner />
      <FloatingMenu />

      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/dashboard"  element={<DashboardPage />} />
        <Route path="/calculator" element={<FeedCalculator />} />
        <Route path="/learn"      element={<Learn />} />
        <Route path="/privacy"    element={<Privacy />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/signup"     element={<Signup />} />
        <Route path="/profile"    element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;