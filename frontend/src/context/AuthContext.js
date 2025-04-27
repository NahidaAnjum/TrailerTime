import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

  const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    if (username) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider