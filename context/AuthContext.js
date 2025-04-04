'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Load user and token from sessionStorage on initial render
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const decoded = jwtDecode(storedToken);

        setUser(JSON.parse(storedUser)); // Retrieve user from sessionStorage
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();
      }
    }
  }, []);

  const login = (receivedToken) => {
    if (!receivedToken) {
      console.error('Login error: Token is missing');
      return;
    }

    try {
      const decoded = jwtDecode(receivedToken);
      const userData = {
        userId: decoded.userId,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      };

      sessionStorage.setItem('token', receivedToken);
      sessionStorage.setItem('user', JSON.stringify(userData)); // Store user in sessionStorage

      setUser(userData);
      setToken(receivedToken);
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
