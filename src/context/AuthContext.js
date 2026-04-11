import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Check localStorage for a saved session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nutrifeed_user');
    return saved ? JSON.parse(saved) : null;
  });

  function login(userData) {
    localStorage.setItem('nutrifeed_user', JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('nutrifeed_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this in any component that needs auth state
export function useAuth() {
  return useContext(AuthContext);
}