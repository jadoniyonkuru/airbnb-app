import { createContext, useContext, useState } from 'react';

// Shape of everything auth exposes to the app
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// null default — useAuth will guard against using outside provider
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Single boolean drives all auth-gated UI
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // No real API call yet — just flip the flag
  const login = (_email: string, _password: string) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  // Throw early so bugs are caught at the hook call site
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}