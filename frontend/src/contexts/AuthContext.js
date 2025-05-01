import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/auth/login',
        { username, password },
        { withCredentials: true }
      );
      setUser(response.data);
      return true;
    } catch (error) {
      setUser(null);
      throw error.response?.data?.error || 'Login failed';
    }
  };

  const logout = async () => {
    await axios.post(
      'http://localhost:5001/api/auth/logout',
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5001/api/auth/check',
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (error) {
        // 401 is expected when no user is logged in
        if (error.response?.status !== 401) {
          console.error('Auth check error:', error);
        }
        setUser(null);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;