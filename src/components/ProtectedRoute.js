import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrap any route that requires login.
// If not logged in, redirect to /login.
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;