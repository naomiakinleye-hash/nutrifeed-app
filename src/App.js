import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import ConsentBanner from './components/ConsentBanner';
import FloatingMenu from './components/FloatingMenu';
import ProtectedRoute from './components/ProtectedRoute';
import LanguageSelect from './pages/LanguageSelect';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import FeedCalculator from './pages/FeedCalculator';
import Learn from './pages/Learn';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import './App.css';

const NO_NAV_ROUTES = ['/login', '/signup', '/terms', '/language'];

function Layout() {
  const location = useLocation();
  const hideNav  = NO_NAV_ROUTES.includes(location.pathname);

  return (
    <>
      {!hideNav && <Navbar />}
      {!hideNav && <ConsentBanner />}
      {!hideNav && <FloatingMenu />}

      <Routes>
        <Route path="/language" element={<LanguageSelect />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/signup"   element={<Signup />} />
        <Route path="/privacy"  element={<Privacy />} />
        <Route path="/terms"    element={<Terms />} />

        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />
        <Route path="/calculator" element={
          <ProtectedRoute><FeedCalculator /></ProtectedRoute>
        } />
        <Route path="/learn" element={
          <ProtectedRoute><Learn /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;